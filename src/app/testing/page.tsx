import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export default function Home() {
  return (
    <div className="p-8">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Test shadcn/ui</CardTitle>
          <CardDescription>Instalasi berhasil!</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Click me</Button>
        </CardContent>
      </Card>
    </div>
  );
}
