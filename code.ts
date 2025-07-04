figma.showUI(__html__, { width: 300, height: 350 });

// 👇 Mark this function as async
figma.ui.onmessage = async (msg: { type: string; count: number }) => {
  if (msg.type === "generate-all-tag-styles") {
    const base = msg.count; // e.g. 16
    const ratio = 1.618;

    // Golden ratio step levels for common tags
    const tagMap: { [tag: string]: number } = {
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

    for (const tag in tagMap) {
      const step = tagMap[tag];
      const fontSize = +(base * Math.pow(ratio, step)).toFixed(2);

      // You can change font family & style here
      const fontName = { family: "Poppins", style: "Regular" } as FontName;
      await figma.loadFontAsync(fontName);

      const style = figma.createTextStyle();
      style.name = `Golden Fonts/${tag.toUpperCase()}`;
      style.fontName = fontName;
      style.fontSize = fontSize;
      style.lineHeight = { value: fontSize * 1.3, unit: "PIXELS" };
      style.description = `Golden Ratio tag: <${tag}>`;
    }

    figma.notify(
      "All HTML tag text styles generated using the Golden Ratio 🎉"
    );
    figma.closePlugin();
  }
};
