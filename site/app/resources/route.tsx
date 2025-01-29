import { redirect } from "next/navigation";
import { type NextRequest } from 'next/server'
import resources from "../../resources.json" assert { type: "json" };

const resourcesMap = resources as Record<string, string>;

Object.keys(resourcesMap).forEach(key => {
    const lowerKey = key.toLowerCase();
    if (key !== lowerKey) {
        resourcesMap[lowerKey] = resourcesMap[key];
        delete resourcesMap[key];
    }
});

export function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const path = (searchParams.get('path') || "").toLowerCase();
    const destinationPath = resourcesMap[path] ? resourcesMap[path] : resourcesMap["default"];
    return redirect(destinationPath);
}
