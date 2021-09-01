import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SS from '../ss'

test('Testing <SS />', async () => {
    const container = render(<SS />)
    const form = container.getByTestId('form')
    expect(form).toBeInTheDocument()
    const nameInput = container.getByLabelText(/username/i, { selector: 'input' }) as HTMLInputElement
    expect(nameInput.value).toEqual('judo')
    const secretInput = container.queryByLabelText(/secret/i, { selector: 'input' }) as HTMLInputElement
    // secretInput should not be appeared
    expect(secretInput).toBeInTheDocument()
    // after deleting current name on input and type 'roy'
    nameInput.setSelectionRange(0, 5)
    userEvent.type(nameInput, '{backspace}roy')
    expect(nameInput.value).toEqual('roy')
    const closeButton = container.getByText('Close')
    userEvent.click(closeButton)
    await waitFor(() => {
        expect(container.queryByLabelText(/secret/i, { selector: 'input' })).toBeNull()
    })
})
