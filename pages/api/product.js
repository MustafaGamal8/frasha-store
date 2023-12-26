import { PrismaClient } from '@prisma/client';
import Jimp from 'jimp';

const prisma = new PrismaClient();

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '8mb' 
      }
  }
}

export default async function handler(req, res) {
  if (req.method == 'POST') {
    await uploadProduct(req, res)
  }
  else if (req.method == 'GET') {
   await  getProduct(req, res)
  }
  else{
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

}




const  uploadProduct = async (req,res) => {
  
  const contentLength = req.headers['content-length'] ? parseInt(req.headers['content-length'], 10) : 0;
  const sizeInMB = contentLength / (1024 * 1024); 

  
  if (sizeInMB > 8) { 
    return res.status(413).json({ error: 'حجم الملف كبير جدا' });
  }

  try {
    const { name, price, description, link, categoryId, photos } = req.body;

    if (Number(price) && !name || !price || !description || !link || !photos) {
      return res.status(400).json({ error: 'يجب تعبئة جميع الحقول' });
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

    // for (const buffer of photos) {
    //   const compressedImageBuffer = await sharp(Buffer.from(buffer, 'base64'))
    //     .resize({ width: 900 })
    //     .toBuffer()


    //   const photo = await prisma.photo.create({
    //     data: {
    //       photo: compressedImageBuffer,
    //       product: {
    //         connect: {
    //           id: createdProduct.id,
    //         },
    //       }
    //     },
    //   });

    //   await prisma.photo.update({
    //     where: {
    //       id: photo.id,
    //     },
    //     data: {
    //       url: "/api/images/" + photo.id,
    //     },

    //   })
    // }


    for (const buffer of photos) {
      const image = await Jimp.read(Buffer.from(buffer, 'base64'));

      // Resize the image using Jimp
      await image.resize(900, Jimp.AUTO); // Set width to 900 pixels, maintain aspect ratio for height

      const compressedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

      const photo = await prisma.photo.create({
        data: {
          photo: compressedImageBuffer,
          product: {
            connect: {
              id: createdProduct.id,
            },
          },
        },
      });

      await prisma.photo.update({
        where: {
          id: photo.id,
        },
        data: {
          url: '/api/images/' + photo.id,
        },
      });
    }

    return res.status(200).json({ message: 'تم اضافة المنتج بنجاح', productId: createdProduct.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'فشل في اضافة المنتج' });
  }
}


const  getProduct = async (req,res) =>{

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