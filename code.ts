// code.ts
figma.showUI(__html__, { width: 360, height: 440 });

figma.listAvailableFontsAsync().then((fonts) => {
  const defaultFonts = fonts
    .filter((f) => {
      const styles = ["Regular", "Medium"];
      return styles.indexOf(f.fontName.style) !== -1;
    })
    .map((f) => f.fontName);

  figma.ui.postMessage({ type: "font-list", fonts: defaultFonts });
});

figma.ui.onmessage = async (msg) => {
  if (msg.type === "generate-all-tag-styles") {
    const base = msg.count;
    const fontName = msg.fontName as FontName;
    const ratio = 1.618;

    const tagMap: Record<string, number> = {
      h1: 5,
      h2: 4,
      h3: 3,
      h4: 2,
      h5: 1,
      h6: 0,
      p: 0,
      span: 0,
      label: -1,
      button: 0,
      blockquote: 1,
      code: -1,
      pre: -1,
      small: -2,
      caption: -2,
    };

    await figma.loadFontAsync(fontName);

    for (const tag in tagMap) {
      const step = tagMap[tag];
      const fontSize = parseFloat((base * Math.pow(ratio, step)).toFixed(2));

      const style = figma.createTextStyle();
      style.name = `Golden Fonts/${tag.toUpperCase()}`;
      style.fontName = fontName;
      style.fontSize = fontSize;
      style.lineHeight = { value: fontSize * 1.3, unit: "PIXELS" };
      style.description = `Golden Ratio style for <${tag}>`;
    }

    figma.ui.postMessage({ type: "generation-complete" });
    // figma.notify("All golden ratio styles generated 🎉");
    // figma.closePlugin();
  }
};
