import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
import RehypeHighlight from "rehype-highlight";
import { useRef, useState, RefObject, useEffect, useMemo } from "react";
import { copyToClipboard } from "../utils";
import mermaid from "mermaid";

import LoadingIcon from "../icons/three-dots.svg";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { showImageModal } from "./ui-lib";

export function Mermaid(props: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (props.code && ref.current) {
      mermaid
        .run({
          nodes: [ref.current],
          suppressErrors: true,
        })
        .catch((e) => {
          setHasError(true);
          console.error("[Mermaid] ", e.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.code]);

  function viewSvgInNewWindow() {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    const text = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([text], { type: "image/svg+xml" });
    showImageModal(URL.createObjectURL(blob));
  }

  if (hasError) {
    return null;
  }

  return (
    <div
      className="no-dark mermaid"
      style={{
        cursor: "pointer",
        overflow: "auto",
      }}
      ref={ref}
      onClick={() => viewSvgInNewWindow()}
    >
      {props.code}
    </div>
  );
}

export function PreCode(props: { children: any }) {
  const ref = useRef<HTMLPreElement>(null);
  const refText = ref.current?.innerText;
  const [mermaidCode, setMermaidCode] = useState("");

  const renderMermaid = useDebouncedCallback(() => {
    if (!ref.current) return;
    const mermaidDom = ref.current.querySelector("code.language-mermaid");
    if (mermaidDom) {
      setMermaidCode((mermaidDom as HTMLElement).innerText);
    }
  }, 600);

  useEffect(() => {
    setTimeout(renderMermaid, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refText]);

  return (
    <>
      {mermaidCode.length > 0 && (
        <Mermaid code={mermaidCode} key={mermaidCode} />
      )}
      <pre ref={ref}>
        <span
          className="copy-code-button"
          onClick={() => {
            if (ref.current) {
              const code = ref.current.innerText;
              copyToClipboard(code);
            }
          }}
        ></span>
        {props.children}
      </pre>
    </>
  );
}

function escapeDollarNumber(text: string) {
  let escapedText = "";

  for (let i = 0; i < text.length; i += 1) {
    let char = text[i];
    const nextChar = text[i + 1] || " ";

    if (char === "$" && nextChar >= "0" && nextChar <= "9") {
      char = "\\$";
    }

    escapedText += char;
  }

  return escapedText;
}

interface CustomLinkProps {
  href?: string;
  children: React.ReactNode;
  onCustomClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  [key: string]: any;
}

function CustomLink({ href, children, onCustomClick, ...props }: CustomLinkProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log("[markdown.tsx] handleLinkClick href: " + href);
    console.log("[markdown.tsx] handleLinkClick children: " + children);
    console.log(
      "[markdown.tsx] handleLinkClick onCustomClick: " + onCustomClick,
    );
    console.log("[markdown.tsx] handleLinkClick props: " + props);
    if (href !== undefined) {
      onCustomClick(e, href);
    }
  };

  return (
    <a href={href} onClick={handleLinkClick} {...props}>
      {children}
    </a>
  );
}

function _MarkDownContent(props: { content: string; onLinkClick: any }) {
  const escapedContent = useMemo(
    () => escapeDollarNumber(props.content),
    [props.content],
  );

  return (
    <ReactMarkdown
      remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
      rehypePlugins={[
        RehypeKatex,
        [
          RehypeHighlight,
          {
            detect: false,
            ignoreMissing: true,
          },
        ],
      ]}
      components={{
        pre: PreCode,
        p: (pProps) => <p {...pProps} dir="auto" />,
        // a: (aProps) => {
        //   const href = aProps.href || "";
        //   const isInternal = /^\/#/i.test(href);
        //   const target = isInternal ? "_self" : aProps.target ?? "_blank";
        //   return <a {...aProps} target={target} />;
        // },
        a: (aProps) => (
          <CustomLink {...aProps} href={aProps.href || "#"} onCustomClick={props.onLinkClick} />
        ),
      }}
    >
      {escapedContent}
    </ReactMarkdown>
  );
}

export const MarkdownContent = React.memo(_MarkDownContent);

export function Markdown(
  props: {
    content: string;
    loading?: boolean;
    fontSize?: number;
    parentRef?: RefObject<HTMLDivElement>;
    defaultShow?: boolean;
    onLinkClick: any;
    isUserText?: boolean;
  } & React.DOMAttributes<HTMLDivElement>,
) {

  const mdRef = useRef<HTMLDivElement>(null);
  
  const { isUserText } = props;
  const textColorStyle = isUserText ? { color: 'white' } : {};
  const backgroundColorStyle = isUserText ? { backgroundColor: '#EA4927' } : { backgroundColor: '#F2F2F2' };

  return (
    <div
      className="markdown-body"
      style={{
        ...textColorStyle,
        ...backgroundColorStyle,
        fontSize: `${props.fontSize ?? 14}px`,
      }}
      ref={mdRef}
      onContextMenu={props.onContextMenu}
      onDoubleClickCapture={props.onDoubleClickCapture}
      dir="auto"
      // onLinkClick={props.onLinkClick}
    >
      {props.loading ? (
        <LoadingIcon />
      ) : (
        <MarkdownContent
          content={props.content}
          onLinkClick={props.onLinkClick}
        />
      )}
    </div>
  );
}
