

import Label from 'components/UI/Label';
import FormControl from 'components/UI/FormControl';

const TextArea = ({
  id = 'text-area',
  label,
  ...rest
}) => (
  <FormControl>
    {label && <Label htmlFor={id}>{label}</Label>}
    <textarea
      id={id}
      {...rest} />
    <style jsx>{`
      textarea {
        width: 100%;
        height: 150px;
        padding: 14px 18px;
        color: var(--palette-text-primary);
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 1.5;
        font-family: inherit;
        box-sizing: border-box;
        border: 2px solid var(--palette-divider);
        border-radius: 8px;
        background-color: var(--palette-background-paper);
        transition: all 0.2s ease-in-out;
        outline: none;
        resize: none;
      }

      textarea:hover {
        border-color: var(--palette-text-secondary);
      }

      textarea:focus {
        border-color: var(--palette-primary-main);
        box-shadow: 0 0 0 3px rgba(var(--palette-primary-main-rgb), 0.1);
      }

      textarea::placeholder {
        color: var(--palette-text-disabled);
      }
    `}</style>
  </FormControl>
);

export default TextArea;
