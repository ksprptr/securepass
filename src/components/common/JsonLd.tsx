interface Props {
  schema: Record<string, unknown>;
}

/**
 * Function to serialize structured data for embedding in a `<script>` element
 **/
const serialize = (schema: Record<string, unknown>): string =>
  // JSON.stringify leaves `<`, `>`, `&` and U+2028/29 raw — a `</script>` value would break out.
  JSON.stringify(schema)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

/**
 * Component representing a JSON-LD structured-data block
 **/
export default function JsonLd({ schema }: Props) {
  return (
    <script
      type='application/ld+json'
      // Escaped above — `<`, `>` and `&` cannot reach the document as markup
      dangerouslySetInnerHTML={{ __html: serialize(schema) }}
    />
  );
}
