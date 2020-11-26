import React from 'react';
import { reduce, isEmpty, map } from 'lodash';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import {
  Form,
  Card,
  Heading,
  Subheading,
  Paragraph,
  TextField,
  CheckboxField,
  Typography,
  Note,
} from '@contentful/forma-36-react-components';
import { isShortTextField, isShortTextListField } from '../../utils/field';
import './styles.css';

class ConfigForm extends React.Component {
  getApplicableContentTypeFields(item = {}) {
    return reduce(
      item.fields,
      (acc, field) => {
        if (isShortTextField(field)) {
          acc.push({ name: field.name, id: field.id, type: 'Short text' });
        } else if (isShortTextListField(field)) {
          acc.push({ name: field.name, id: field.id, type: 'Short text, list' });
        }

        return acc;
      },
      [],
    );
  }

  getApplicableContentTypes(contentTypes = {}) {
    return reduce(
      contentTypes.items,
      (acc, item) => {
        const fields = this.getApplicableContentTypeFields(item);

        if (!isEmpty(fields)) {
          acc.push({ name: item.name, id: item.sys.id, fields });
        }

        return acc;
      },
      [],
    );
  }

  isChecked(name) {
    return this.props.parameters[name] === 'true';
  }

  getCheckboxValue(name) {
    return this.isChecked(name) ? 'false' : 'true';
  }

  renderAssignFields(contentTypes) {
    const { onChange } = this.props;

    return map(contentTypes, (contentType) => (
      <Typography key={contentType.id}>
        <Subheading>{contentType.name}</Subheading>
        {map(contentType.fields, (field) => {
          const name = `${contentType.id}.${field.id}`;
          return (
            <div key={name}>
              <CheckboxField
                labelText={field.name}
                helpText={`${field.type} · Field ID: ${field.id}`}
                name={name}
                id={name}
                onChange={onChange}
                checked={this.isChecked(name)}
                value={this.getCheckboxValue(name)}
              />
            </div>
          );
        })}
      </Typography>
    ));
  }

  render() {
    const { ids, parameters, contentTypes, errors, onChange } = this.props;
    const applicableContentTypes = this.getApplicableContentTypes(contentTypes);

    return (
      <Card id="app-config">
        <Form>
          <Heading>Swell Contentful App</Heading>
          <Paragraph>
            The Swell Contentful App allows editors to select products from their Swell store and
            reference them inside of Contentful entries.
          </Paragraph>
          <hr />
          <Subheading>Configuration</Subheading>
          <Paragraph>
            To configure the application, you need to specify your <b>Store ID</b> and{' '}
            <b>Public key</b>. Credentials can be obtained in your Swell Store settings (Settings
            -&gt; API keys).
          </Paragraph>
          <TextField
            id="store-id"
            name="storeId"
            labelText="Store ID"
            helpText="Please enter your store ID"
            value={parameters.storeId || ''}
            onChange={onChange}
            validationMessage={errors.storeId}
            required
          />
          <TextField
            id="public-key"
            name="publicKey"
            labelText="Public key"
            helpText="Please enter your public key"
            value={parameters.publicKey || ''}
            onChange={onChange}
            validationMessage={errors.publicKey}
            required
          />
          <CheckboxField
            labelText="Variant selection"
            helpText="This option allows you to select product variants"
            name="variantSelection"
            id="variant-selection"
            onChange={onChange}
            checked={this.isChecked('variantSelection')}
            value={this.getCheckboxValue('variantSelection')}
          />
          <hr />
          <Subheading>Assign to fields</Subheading>
          <Paragraph>
            This app can only be used with <b>Short text</b> or <b>Short text, list</b> fields.
            {!isEmpty(applicableContentTypes) &&
              ' Select which fields you’d like to enable for this app.'}
          </Paragraph>
          {!isEmpty(applicableContentTypes) ? (
            this.renderAssignFields(applicableContentTypes)
          ) : (
            <Note noteType="warning">
              There are <b>no content types with Short text or Short text, list</b> fields in this
              environment. You can add one in your{' '}
              <a
                target="blank"
                href={`https://app.contentful.com/spaces/${ids.space}/content_types`}
              >
                content model
              </a>{' '}
              and assign it to the app from this screen.
            </Note>
          )}
        </Form>
      </Card>
    );
  }
}

export default ConfigForm;
