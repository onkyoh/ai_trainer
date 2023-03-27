import Toast from "../Toast";
import { render, screen } from '@testing-library/react'
import useToast from "../useToast";
import { useEffect } from "react";

test('renders toast', () => {

    const toastProps = {
        message: 'message',
        success: true
    }
    
    const Component = () => {

        const {toast, notify} = useToast()

        useEffect(() => {
            notify(toastProps)
        }, [])

        return (
            <div>
                {toast && <Toast {...toastProps}/>}
            </div>
        )
    }

    render(<Component/>)

    const toastAlert = screen.getByLabelText('alert')

    expect(toastAlert).toHaveTextContent('✓')
    expect(toastAlert).toHaveTextContent('message')

})