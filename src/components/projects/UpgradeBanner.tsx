"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UpgradeBanner() {
  return (
    <Card className="border-yellow-300 bg-yellow-50">
      <CardHeader>
        <CardTitle>Upgrade to Pro </CardTitle>
        <CardDescription>Unlock exports, teams, and unlimited AI</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="default">Upgrade Now</Button>
      </CardContent>
    </Card>
  );
}