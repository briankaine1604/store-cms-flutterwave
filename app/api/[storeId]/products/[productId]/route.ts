import { deleteCloudinaryImage } from "@/actions/deleteCloudinaryImage";
import { currentUserId } from "@/hooks/current-user-id";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product Id is Required", { status: 400 });
    }

    const product = await db.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        color: true,
        sizes: true,
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const userId = await currentUserId();
    const body = await req.json();

    const {
      name,
      price,
      sizeIds,
      colorId,
      categoryId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("Image is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category Id required", { status: 400 });
    }
    if (!sizeIds) {
      return new NextResponse("Size Id is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("Color Id is required", { status: 400 });
    }
    if (!params.productId) {
      return new NextResponse("Product Id is Required", { status: 400 });
    }

    const storeIdbyUser = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeIdbyUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        colorId,
        categoryId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const userId = await currentUserId();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.productId) {
      return new NextResponse("Product Id is Required", { status: 400 });
    }

    const storeIdbyUser = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeIdbyUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const findProductImage = await db.product.findUnique({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      select: {
        images: true,
      },
    });

    if (!findProductImage) {
      return new NextResponse("Billboard not found", { status: 404 });
    }

    const images = findProductImage.images;

    images.forEach((imageObject) => {
      const url = imageObject.url;
      const parts = url.split("/");
      const identifierWithExtension = parts[parts.length - 1];
      const identifier = identifierWithExtension.split(".")[0];
      deleteCloudinaryImage({ publicId: identifier });
    });

    const product = await db.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
