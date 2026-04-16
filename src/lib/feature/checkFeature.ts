
export function hasFeature(user: any, feature: string) {
  if (user.plan === "pro") return true;

  if (feature === "export") return false;
  if (feature === "team") return false;

  return false;
}