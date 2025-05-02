export function FontTest() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="font-sans text-4xl font-bold">Este es un título con Roboto</h1>
      <p className="font-sans text-lg">Este es un párrafo con Roboto. Debería verse con la fuente sans-serif Roboto.</p>
      <div className="font-mono p-4 bg-gray-100 rounded">
        <code>Este es texto monoespaciado con Roboto Mono</code>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-sans font-medium text-xl mb-2">Roboto Light (300)</h3>
          <p className="font-sans font-light">Este texto usa Roboto Light</p>
        </div>
        <div>
          <h3 className="font-sans font-medium text-xl mb-2">Roboto Regular (400)</h3>
          <p className="font-sans font-normal">Este texto usa Roboto Regular</p>
        </div>
        <div>
          <h3 className="font-sans font-medium text-xl mb-2">Roboto Medium (500)</h3>
          <p className="font-sans font-medium">Este texto usa Roboto Medium</p>
        </div>
        <div>
          <h3 className="font-sans font-medium text-xl mb-2">Roboto Bold (700)</h3>
          <p className="font-sans font-bold">Este texto usa Roboto Bold</p>
        </div>
      </div>
    </div>
  )
}
