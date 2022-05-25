# What is React Hook Form?

React Hook Form is a performant, flexible and extensible form library for React and React-based frameworks like NextJS that implements forms with React hooks, with easy-to-use validation, integration with UI libraries, third-party validatation libraries like Zod, Yup etc.

---

# Installation and Basic Setup

- Install react hook form by typing, `npm i react-hook-form` or `yarn add react-hook-form`.
- On the Form component, `import { useForm } from 'react-hook-form'`.
- Call the hook and destructure it like:

  ```
  import { useForm } from 'react-hook-form';

  const { register, handleSubmit, formState: { errors } } = useForm();
  ```

- **Register** every form field, like so: `{...register('Fieldname', {...validations} ) }`. Note, every field you register must contain the `name` attribute.

- The following validations come out of the box:

  - required
  - min
  - max
  - minLength
  - maxLength
  - pattern
  - validate

- **Validations** can be provided in the following ways:

  - As a single object containing all the validations for a field, in the format:

    `{ required: true, maxLength: 100 }`

  ```
    <input
        className="contact__input"
        name="name"
        type="text"
        {...register('Name', {
        required: true,
        maxLength: 100,
        pattern: /^[A-Za-z]+$/i,
        })}
    />
  ```

  - As a nested object of validations which also contain the `value` and an error `message` for each validation for the field, in the format,

    `{required: { value: true, message: 'Please enter your email.' }, pattern: /^\S+@\S+$/i }`

  ```
    <input
        className="contact__input"
        name="email"
        type="email"
        {...register('Email', {
        required: {
            value: true,
            message: 'Please enter your email.',
        },
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        })}
    />
  ```

- Add the `handleSubmit` to the form's `onSubmit`. `handleSubmit` takes a function that is executed on form submission.

- Add an `<input type='submit' value='Submit' />` button. Note a `<button type='submit'>Submit</button>` won't work.

- **Syntax so far:**

  ```
    <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 md:px-[20%]"
    >
        <div className="contact_form--group flex flex-wrap gap-8 md:gap-10">
            <div className="contact__form--name flex flex-col gap-2 grow">
                <label className="contact__label">Name</label>
                <input
                  className="contact__input"
                  name="name"
                  type="text"
                  {...register('name', {
                    required: true,
                    maxLength: 100,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                />
            </div>

            <div className="contact__form--email flex flex-col gap-2 grow">
                <label className="contact__label">Email</label>
                <input
                  className="contact__input"
                  name="email"
                  type="email"
                  {...register('email', {
                    required: { value: true, message: 'Please enter your email.' },
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  })}
                />
            </div>
        </div>

        <div className="contact__form--message flex flex-col gap-2">
            <label className="contact__label">Message</label>
            <textarea
                className="contact__input h-40"
                name="message"
                {...register('message', { required: true, maxLength: 1000 })}
              />
        </div>

        <div className="contact__form--submit flex flex-col gap-2 md:px-20 lg:px-40">
            <input
            type="submit"
            value="Submit"
            className="contact__submit border-2 py-5"
            />
        </div>
    </form>
  ```

- Write the onSubmit handler that sends a POST request to an API endpoint,

  Using **`axios`**,

  ```
  const onSubmit = async formData => {
    try {
      const { status } = await axios.post('/api/contact', formData);
      if (status === 200) reset();
    } catch (error) {
      console.error(error);
    }
  };
  ```

  Using **`fetch`**,

  ```
  const onSubmit = async formData => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      response.json();
      if (response.status === 200) reset();
    } catch (error) {
      console.error(error);
    }
  };
  ```

---
