import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Overview } from "./overview";
import { RecentCases } from "./recent-cases";

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 [&>*:last-child]:mb-0">
      <Overview />
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Recent Cases</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentCases />
        </CardContent>
      </Card>
    </div>
  );
}
