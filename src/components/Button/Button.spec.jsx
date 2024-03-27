const { render, screen, fireEvent } = require("@testing-library/react")
import userEvent from '@testing-library/user-event';
import { Button } from './index';

describe('<Button />', () => {
  it('should render the button with the text "Load More"', () => {
    render(<Button text={"Load More"}/>);
    expect.assertions(1);

    const button = screen.getByRole('button', {name: /load more/i});
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Load More" onClick={fn}/>);

    const button = screen.getByRole('button', {name: /load more/i});
    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disable when disable is true', () => {
    render(<Button text="Load More" disabled={true}/>);
    const button = screen.getByRole('button', {name: /load more/i});
    expect(button).toBeDisabled();
  });

  it('should be enable when disable is false', () => {
    render(<Button text="Load More" disabled={false}/>);
    const button = screen.getByRole('button', {name: /load more/i});
    expect(button).toBeEnabled();
  });

  it('should match snapshot', () => {
    const {container} = render(<Button text="Load More" disabled={false}/>);
   
    expect(container.firstChild).toMatchSnapshot();
  });
});
