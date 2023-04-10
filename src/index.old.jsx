function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(element.type)

  const isProperty = key => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })

  element.props.children.forEach(child => {
    render(child, dom)
  });

  container.appendChild(dom)
}
const MiniReact = {
  createElement:  (type, props, ...children) => {
    return {
      type,
      props: {
        ...props,
        children: children.map(child => {
          if(typeof child === 'object'){
            return child
          }
          return {
            type: 'TEXT_ELEMENT',
            props: {
              nodeValue: child,
              children: [],
            }
          }
        })
      }
    }
  },
  render
}
// 告诉 Babel 使用 MiniReact.createElement 来解析 jsx 语法
/** @jsx MiniReact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
console.log('element======', element)
const container = document.getElementById("root")
MiniReact.render(element, container)


// const element = {
//   type: "h1",
//   props: {
//     title: "foo",
//     children: [
//       {
//         type: "span",
//         props: {
//           title: 'bar',
//           children: 'hello span'
//         }
//       },
//       {
//         type: "span",
//         props: {
//           title: 'bar2',
//           children: 'hello span2'
//         }
//       },
//     ],
//   },
// }