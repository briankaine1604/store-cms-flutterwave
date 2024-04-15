import { deleteCloudinaryImage } from "@/actions/deleteCloudinaryImage";
import { currentUserId } from "@/hooks/current-user-id";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard Id is Required", { status: 400 });
    }

    const billboard = await db.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const userId = await currentUserId();
    const body = await req.json();
    const { label, imgUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label is Required", { status: 400 });
    }
    if (!imgUrl) {
      return new NextResponse("Image Url is Required", { status: 400 });
    }
    if (!params.billboardId) {
      return new NextResponse("Billboard Id is Required", { status: 400 });
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

    const billboard = await db.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imgUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const userId = await currentUserId();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.billboardId) {
      return new NextResponse("Billboard Id is Required", { status: 400 });
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

    const findBillboard = await db.billboard.findUnique({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
      select: {
        imgUrl: true,
      },
    });

    if (!findBillboard) {
      return new NextResponse("Billboard not found", { status: 404 });
    }

    const url = findBillboard.imgUrl;
    const parts = url.split("/");
    const identifierWithExtension = parts[parts.length - 1];
    const identifier = identifierWithExtension.split(".")[0];
    deleteCloudinaryImage({ publicId: identifier });

    const billboard = await db.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
