import { isEmpty, startsWith } from 'lodash';

const rules = {
  storeId: (value) => {
    if (isEmpty(value)) {
      return 'Store ID is a required field';
    }
  },
  publicKey: (value) => {
    if (isEmpty(value)) {
      return 'Public key is a required field';
    } else if (!startsWith(value, 'pk_') || value.length !== 35) {
      return 'Invalid public key format';
    }
  },
};

export default function validate(name, value) {
  return rules[name] && rules[name](value);
}
