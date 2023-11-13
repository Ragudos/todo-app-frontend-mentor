import { promises } from "node:fs";
import { dirname } from "node:path";
import pug from "pug";

export default function pugPlugin() {
    return {
        name: "pug",
        setup(build) {
            build.onLoad(
                {
                    filter: /\.(jade|pug)$/
                },
                async function(args) {
                    const template = await promises.readFile(args.path, "utf-8");

                    const contents = pug.compileClient(
                        template,
                        {
                            filename: args.path,
                            basedir: dirname(args.path),
                            
                        }
                    );

                    return {
                        contents: `${contents}\n\nexport default template;`,
                        loader: "js"
                    };
                }
            )
        }
    };
};
