//  * App.test
//  *
//  * This file contains unit tests for the App component.
//  * It uses React Testing Library to render the component and assert its behavior.
//  *

import { render, screen } from "@testing-library/react"
import App from "./App"

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
});
