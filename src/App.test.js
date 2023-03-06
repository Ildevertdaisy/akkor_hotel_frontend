
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Card from './components/Card';
import Header from "./components/Header";
import App from "./App";


const hotel = {
    name: "Akkor",
    location: "Lorem ipsum",
    description: "lorem ipsum"
};

test("Card is rendered", () => {
    render(<Card hotel={hotel}/>);
    const heading = screen.getByRole("heading", {name: "Akkor"});
    expect(heading).toBeInTheDocument();
});