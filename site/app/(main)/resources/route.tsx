import { redirect } from "next/navigation";
import { type NextRequest } from 'next/server'
import resources from "../../../resources.json" assert { type: "json" };

export function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const path = (searchParams.get('path') || "").toLowerCase();
    const resourcesMap = resources as Record<string, string>;
    const destinationPath = resourcesMap[path] ? resourcesMap[path] : resourcesMap["default"];
    return redirect(destinationPath);
}
