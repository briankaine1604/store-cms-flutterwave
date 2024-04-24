import { getGraphRevenue } from "@/actions/get-graph-value";
import { getTotalCount } from "@/actions/getTotalCount";
import { getTotalProducts } from "@/actions/getTotalProductsinStock";
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { CreditCard, Package } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";

interface Props {
  params: { storeId: string };
}
const DashboardPage = async ({ params }: Props) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const count = await getTotalCount(params.storeId);
  const stock = await getTotalProducts(params.storeId);
  const graph = await getGraphRevenue(params.storeId);

  return (
    <div className=" flex-col">
      <div className="flex-1 space-y-4 p-8 pt-4">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="space-y-0 pb-2">
              <div className="flex justify-between">
                <CardTitle className="">Total Revenue</CardTitle>
                <TbCurrencyNaira className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="sm:text-2xl font-bold">
              {formatter.format(totalRevenue)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-0 pb-2">
              <div className="flex justify-between">
                <CardTitle className="">Sales</CardTitle>
                <CreditCard className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="sm:text-2xl font-bold">
              +{count}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-0 pb-2">
              <div className="flex justify-between">
                <CardTitle className="">Products in stock</CardTitle>
                <Package className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="sm:text-2xl font-bold">
              +{stock}
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview data={graph} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
