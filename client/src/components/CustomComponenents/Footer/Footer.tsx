const placeholders = [
  {
    text: "item1"
  }, {
    text: "item2"
  }, {
    text: "item3"
  }
]

const Footer = () => {
  return (
    <div className="bg-primary text-secondary p-3">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        <div>
          <h2 className="font-bold text-xl mb-5">💅🏻 Pooja Beauty Salon</h2>
          <p className="text-sm">Blocks, components and templates for building websites, landing pages and apps. Made with React, Shadcn/ui and Tailwind.</p>
          <p className="text-sm">Perfect for early-stage product, startups, indie hackers, and personal projects.</p>
        </div>
        <div>
          <h3 className="font-bold mb-5">Items Heading</h3>
          <ul>
            {placeholders.map((item, i) => {
              return (
                <li key={i}>{item.text}</li>
              )
            })}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-5">Items Heading</h3>
          <ul>
            {placeholders.map((item, i) => {
              return (
                <li key={i}>{item.text}</li>
              )
            })}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-5">Items Heading</h3>
          <ul>
            {placeholders.map((item, i) => {
              return (
                <li key={i}>{item.text}</li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer