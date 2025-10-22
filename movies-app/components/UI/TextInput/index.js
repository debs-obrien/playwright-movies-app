
import Label from 'components/UI/Label';
import FormControl from 'components/UI/FormControl';

const TextInput = ({
  id = 'input',
  label,
  ...rest
}) => (
  <>
    <FormControl>
      {label && <Label htmlFor={id}>{label}</Label>}
      <input
        id={id}
        type='text'
        {...rest} />
    </FormControl>
    <style jsx>{`
      input[type=text] {
        width: 100%;
        padding: 14px 18px;
        color: var(--palette-text-primary);
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 1.5;
        box-sizing: border-box;
        border: 2px solid var(--palette-divider);
        border-radius: 8px;
        background-color: var(--palette-background-paper);
        transition: all 0.2s ease-in-out;
        outline: none;
      }

      input[type=text]:hover {
        border-color: var(--palette-text-secondary);
      }

      input[type=text]:focus {
        border-color: var(--palette-primary-main);
        box-shadow: 0 0 0 3px rgba(var(--palette-primary-main-rgb), 0.1);
      }

      input[type=text]::placeholder {
        color: var(--palette-text-disabled);
      }
    `}</style>
  </>
);

export default TextInput;
