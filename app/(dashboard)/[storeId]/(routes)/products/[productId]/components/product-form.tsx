"use client";
import { deleteCloudinaryImage } from "@/actions/deleteCloudinaryImage";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import ImageUploader from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { UseOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Category,
  Color,
  Image,
  Product,
  ProductSizes,
  Size,
} from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

import * as z from "zod";

interface ProductFormProps {
  initialData?: (Product & { images: Image[]; sizes: ProductSizes[] }) | null;
  colors: Color[];
  sizes: Size[];
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  sizeIds: z.object({ productId: z.string(), sizeId: z.string() }).array(),
  colorId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  colors,
  sizes,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product" : "Add a new product";
  const toastMessage = initialData ? "product updated" : "product created";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          colorId: "",
          sizeIds: [],
          isFeatured: false,
          isArchived: false,
        },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: ProductFormValues) => {
    console.log("data:", data);
    try {
      setIsLoading(true);
      let response;
      if (initialData) {
        response = await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        response = await axios.post(`/api/${params.storeId}/products`, data);
      }
      console.log("response:", response);
      const productId = response.data.id;
      console.log("productid:", productId);

      console.log("data:", data);
      await Promise.all(
        data.sizeIds.map(
          async (size: { productId: string; sizeId: string }) => {
            await axios.patch(`/api/${params.storeId}/products/${productId}`, {
              sizeId: size.sizeId,
              productId: productId,
            });
          }
        )
      );

      router.push(`/${params.storeId}/products`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);

      router.push(`/${params.storeId}/products`);
      router.refresh();
      toast.success("Product deleted");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const handleRemove = (
    imageUrl: string,
    field: FieldValues,
    onChange: (value: any[]) => void
  ) => {
    const updatedValue = field.value.filter(
      (image: { url: string }) => image.url !== imageUrl
    );
    onChange(updatedValue);
    const parts = imageUrl.split("/");
    const identifierWithExtension = parts[parts.length - 1];
    const identifier = identifierWithExtension.split(".")[0];
    deleteCloudinaryImage({ publicId: identifier });
  };

  const handleCheckboxChange = (
    sizeId: string,
    isChecked: boolean,
    field: FieldValues,
    onChange: (value: any) => void
  ) => {
    const currentSizes = field.value;
    let updatedSizes: { productId: string; sizeId: string }[];
    if (isChecked) {
      updatedSizes = [...currentSizes, { productId: "", sizeId }];
    } else {
      updatedSizes = currentSizes.filter(
        (size: ProductSizes) => size.sizeId !== sizeId
      );
    }
    onChange(updatedSizes);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        isLoading={isLoading}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant={"destructive"}
            size={"sm"}
            disabled={isLoading}
            onClick={() => setOpen(true)}
          >
            Delete
            <Trash className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8 ">
          <FormField
            control={control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUploader
                    value={field.value.map((image) => image.url)}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) => handleRemove(url, field, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeIds"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2 rounded-md border p-4">
                  <FormLabel>Product Sizes</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-5 gap-x-3">
                      {sizes.map((size) => (
                        <div
                          key={size.id}
                          className="mr-4 mb-2 flex items-center"
                        >
                          <Checkbox
                            checked={field.value.some(
                              (s) => s.sizeId === size.id
                            )}
                            onCheckedChange={(isChecked: boolean) =>
                              handleCheckboxChange(
                                size.id,
                                isChecked,
                                field,
                                field.onChange
                              )
                            }
                          />
                          <span className="ml-2">{size.name}</span>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                  <div className="">
                    <FormDescription>
                      Select the sizes applicable to this product.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This Product will appear on the home page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This Product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
