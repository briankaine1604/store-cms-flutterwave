import { ColorForm } from "../[colorId]/components/color-form";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
        <ColorForm />
      </div>
    </div>
  );
};

export default ColorPage;
