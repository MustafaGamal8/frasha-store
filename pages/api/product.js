import { PrismaClient } from '@prisma/client';
import sharp from 'sharp';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      getProduct(req, res);
      break;
    case "POST":
      console.log("before");
      await uploadProduct(req, res);
      console.log("after");
      break;
    default:
      res.status(405).json({ error: 'Method Not Allowed' });
      break;
  }
}




const uploadProduct = async (req, res) => {

  try {
    const contentLength = req.headers['content-length'] ? parseInt(req.headers['content-length'], 10) : 0;
    const sizeInMB = contentLength / (1024 * 1024);


    if (sizeInMB > 10) {
      return res.status(413).json({ error: 'حجم الملف كبير جدا' });
    }

    const { name,  description, link, categoryId, photos } = req.body;
    let  {price}  = req.body;

    
    if (!name || !price || !description || !link || photos.length == 0 ) {
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

    for (const base64 of photos) {
      const compressedImageBuffer = await sharp(Buffer.from(base64, 'base64'))
        .resize({ width: 800 })
        .toBuffer()


      const photo = await prisma.photo.create({
        data: {
          photo: compressedImageBuffer,
          product: {
            connect: {
              id: createdProduct.id,
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

    return res.status(200).json({ message: 'تم اضافة المنتج بنجاح', productId: createdProduct.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'فشل في اضافة المنتج' });
  }

}


const getProduct = async (req, res) => {

  const { id } = req.query;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'المنتج غير موجود' });

  }

  const product = await prisma.product.findUnique({
    where: {
      id
    },
    include: {
      category: true,
      photos: true
    }
  })

  if (!product) {
    return res.status(404).json({ error: 'المنتج غير موجود' });
  }

  return res.status(200).json(product);

}