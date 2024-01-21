import { PrismaClient } from '@prisma/client';
import sharp from 'sharp';
import CheckAuth from '@/services/CheckAuth';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '400mb'
    }
  }
}

export default async function handler(req, res) {
  if (req.method == "POST") {
    const isAdmin = await CheckAuth(req, res);
    isAdmin && await uploadProduct(req, res);    
  }
  else if (req.method == "PUT") {
    const isAdmin = await CheckAuth(req, res);
    isAdmin && await updateProduct(req, res);
  }
  else{
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}


const uploadPhotos = async (ProductId, photos) => {

  for (const p of photos) {
    console.log("photo")
    const compressedImageBuffer = await sharp(Buffer.from(p.data, 'base64'))
    .resize({ width: 800 })
      .toBuffer()

    const photo = await prisma.photo.create({
      data: {
        photo: compressedImageBuffer,
        type: p.type,
        product: {
          connect: {
            id: ProductId,
          },
        }
      },
    });

    await prisma.photo.update({
      where: {
        id: photo.id,
      },
      data: {
        url: "/api/images/" + photo.id,
      },

    })
  }
}

const uploadProduct = async (req, res) => {

  try {

    const contentLength = req.headers['content-length'] ? parseInt(req.headers['content-length'], 10) : 0;
    const sizeInMB = contentLength / (1024 * 1024);


    console.log(sizeInMB)
    if (sizeInMB > 400) {
      return res.status(413).json({ error: 'حجم الملف كبير جدا' });
    }

    const { name,description, link, categoryId, photos } = req.body;
    
    let  {price}  = req.body;
    if (!name || !price || !description  || photos.length == 0 ) {
      return res.status(400).json({ error: 'يجب تعبئة جميع الحقول' });
    }
    
    
    
    if (typeof price != 'number') {
      price = parseInt(price);
      if (isNaN(price)) {
        return res.status(400).json({ error: 'السعر غير صحيح' });
      }
    }
    


    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'القسم غير موجود' });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    })

    if (!category) {
      return res.status(400).json({ error: 'القسم غير موجود' });
    }

    const createdProduct = await prisma.product.create({
      data: {
        name,
        price: parseInt(price),
        description,
        link,
        category: {
          connect: {
            id: categoryId,
          },
        }
      },
    });

    if (createdProduct) {
      await uploadPhotos( createdProduct.id,photos);      
    }

    

    return res.status(200).json({ message: 'تم اضافة المنتج بنجاح', productId: createdProduct.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'فشل في اضافة المنتج' });
  }

}

const updateProduct = async (req, res) => {

  try {
    

  const { name, price , description, link, categoryId, photos , deletedPhotos ,productId} = req.body;


  if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'المنتج غير موجود' });
  }

  const product = await prisma.product.findUnique({
    where: {
      id:productId,
    },
  })

  if (!product) {
    return res.status(400).json({ error: 'المنتج غير موجود' });
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id:productId,
    },
    data: {
      name,
      price: parseInt(price),
      description,
      link,
      category: {
        connect: {
          id: categoryId,
        },
      }
    },
  });

  if (deletedPhotos && deletedPhotos.length > 0) {
    await prisma.photo.deleteMany({
      where: {
        id: {
          in: deletedPhotos
        }
      }
    })
    
  }

  if (photos && photos.length > 0) {
    await uploadPhotos( updatedProduct.id,photos);
  }

  res.status(200).json({ message: 'تم تعديل المنتج بنجاح' });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'فشل في تعديل المنتج' });
  }
}