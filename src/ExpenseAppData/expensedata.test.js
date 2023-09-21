import { render } from "../../node_modules/@testing-library/react/types/index"
import ExpensesData from "./ExpensesData"

test('renders activate button if expense more than 10000', ()=>{
    render(<ExpensesData />);

    const outputelement = screen.getByText('Your expenses are more than ₹10000', {exact: false});
    expect(outputelement).tobeInTheDocument()
})