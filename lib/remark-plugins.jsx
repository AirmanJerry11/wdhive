import Link from "next/link";
import { visit } from "unist-util-visit";



export function replaceLinks({
  href,
  children,
}) {
  // this is technically not a remark plugin but it
  // replaces internal links with <Link /> component
  // and external links with <a target="_blank" />
  return href?.startsWith("/") || href === "" ? (
    <Link href={href} className="cursor-pointer">
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children} ↗
    </a>
  );
}

export function replaceTweets() {
  return (tree) =>
    new (async (resolve, reject) => {
      const nodesToChange = new Array();

      visit(tree, "link", (node) => {
        if (
          node.url.match(
            /https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)([^\?])(\?.*)?/g,
          )
        ) {
          nodesToChange.push({
            node,
          });
        }
      });
      for (const { node } of nodesToChange) {
        try {
          const regex = /\/status\/(\d+)/gm;
          const matches = regex.exec(node.url);

          if (!matches) throw new Error(`Failed to get tweet: ${node}`);

          const id = matches[1];

          node.type = "mdxJsxFlowElement";
          node.name = "Tweet";
          node.attributes = [
            {
              type: "mdxJsxAttribute",
              name: "id",
              value: id,
            },
          ];
        } catch (e) {
          console.log("ERROR", e);
          return reject(e);
        }
      }

      resolve();
    });
}

export function replaceExamples(prisma) {
  return (tree) =>
    new Promise(async (resolve, reject) => {
      const nodesToChange = new Array();

      visit(tree, "mdxJsxFlowElement", (node) => {
        if (node.name == "Examples") {
          nodesToChange.push({
            node,
          });
        }
      });
      for (const { node } of nodesToChange) {
        try {
          const data = await getExamples(node, prisma);
          node.attributes = [
            {
              type: "mdxJsxAttribute",
              name: "data",
              value: data,
            },
          ];
        } catch (e) {
          return reject(e);
        }
      }

      resolve();
    });
}

async function getExamples(node, prisma) {
  const names = node?.attributes[0].value.split(",");

  const data = new Array();

  for (let i = 0; i < names.length; i++) {
    const results = await prisma.example.findUnique({
      where: {
        id: parseInt(names[i]),
      },
    });
    data.push(results);
  }

  return JSON.stringify(data);
}
