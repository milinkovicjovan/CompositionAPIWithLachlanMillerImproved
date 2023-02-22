import path from "path";
import fs from "fs/promises";
import highlightjs from "highlight.js";
import { marked } from "marked";
import { today } from "../posts";

export async function readPosts() {
  const load = async (filename) => {
    const filePath = path.join(__dirname, "content", filename);
    const fileContent = await fs.readFile(filePath, "utf-8");
    return fileContent;
  };

  const toHtml = (markdown) =>
    new Promise((resolve) => {
      marked.parse(
        markdown,
        {
          gfm: true,
          breaks: true,
          highlight: (code) => {
            return highlightjs.highlightAuto(code).value;
          },
        },
        (err, parseResult) => {
          resolve(parseResult);
        }
      );
    });

  const pipelineMd = await load("pipeline.md");

  const pipeline = {
    ...today,
    id: "10",
    title: "A Futuristic Functional Language for Web Dev - ESNext Pipelines",
    markdown: pipelineMd,
    html: await toHtml(pipelineMd),
  };

  const sourceMapsMd = await load("source-maps.md");

  const sourceMaps = {
    ...today,
    id: "11",
    title: "Decoding Variable Length Quantity for Source Maps",
    markdown: sourceMapsMd,
    html: await toHtml(sourceMapsMd),
  };

  const reactivityMd = await load("reactivity.md");

  const reactivity = {
    ...today,
    id: "12",
    title: "Building Vue 3 Reactivity from Scratch",
    markdown: reactivityMd,
    html: await toHtml(reactivityMd),
  };

  const typesafeMd = await load("typesafe.md");

  const typesafe = {
    ...today,
    id: "13",
    title: "Writing A Type Safe Store",
    markdown: typesafeMd,
    html: await toHtml(typesafeMd),
  };

  const introMd = await load("intro.md");

  const intro = {
    ...today,
    id: "14",
    title: "Course Introduction 🎉",
    markdown: introMd,
    html: await toHtml(introMd),
  };

  return [intro, typesafe, reactivity, sourceMaps, pipeline];
}
