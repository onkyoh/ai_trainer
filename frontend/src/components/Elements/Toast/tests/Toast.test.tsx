import Toast from "../Toast";
import useToastStore from "../../../../stores/useToastStore";
import { render, screen } from "@testing-library/react";
import { useEffect } from "react";

test("renders toast", () => {
  const toastProps = {
    message: "message",
    success: true,
  };

  const Component = () => {
    const { toast, notify } = useToastStore();

    useEffect(() => {
      notify(toastProps);
    }, []);

    return <div>{toast && <Toast {...toastProps} />}</div>;
  };

  render(<Component />);

  const toastAlert = screen.getByLabelText("alert");

  expect(toastAlert).toHaveTextContent("✓");
  expect(toastAlert).toHaveTextContent("message");
});
