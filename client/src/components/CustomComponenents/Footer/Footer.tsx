import { services } from "../../../constants/data";

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
    <div className="bg-primary text-secondary px-16 py-16">
      <div className="overflow-hidden grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-16">
        <div>
          <h2 className="font-bold text-xl mb-5">💅🏻 Pooja Beauty Parlour</h2>
          <p className="text-sm">Welcome to Pooja Beauty Parlour and Coaching Classes, where we believe that every woman deserves to feel confident and beautiful. Our team of experienced professionals is dedicated to providing you with the highest quality services in a warm and welcoming environment.</p>
        </div>
        <div>
          <h3 className="font-bold mb-5">Services</h3>
          <ul>
            {services.map((item, i) => {
              return (
                <li key={i}>{item.title}</li>
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