import { SizeForm } from "../[sizeId]/components/size-form";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
        <SizeForm />
      </div>
    </div>
  );
};

export default SizePage;
