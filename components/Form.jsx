import React from 'react';
import Link from 'next/link';
import Input from 'postcss/lib/input';

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className='head_text text-left'>{type} your <span className='blue_gradient'>Prompt</span></h1>
      <p className='desc text-left max-w-md'>
        {type} and share precise prompts with your peers, and let your imagination run wild with any AI-powered platform.
      </p>

    <form 
    onSubmit={handleSubmit}
    className='mt-10 my-8 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
    >
      <label>
        <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI Prompt</span>

        <textarea
          value={post.prompt}
          onChange={(e) => setPost({
            ...post,prompt:e.target.value
          })}
          placeholder='Craft your prompt here......'
          required
          className='form_textarea'
        />

      </label>

      <label>
        <span className='font-satoshi font-semibold text-base text-gray-700'>Tag {`  `}<span>#product, #webdevelopment, #machinelearning etc.</span></span>

        <input
          value={post.tag}
          onChange={(e) => setPost({
            ...post,tag:e.target.value
          })}
          placeholder='#your tag'
          required
          className='form_input'
        />

      </label>

      <div className="flex-end mx-3 mb-5 gap-4">
        <Link href="/" className="px-5 py-1.5 text-sm text-gray-500 rounded-full hover:bg-blue-700 hover:text-white">
          cancel
        </Link>

        <button
        type="submit"
        disabled={submitting}
        className='px-5 py-1.5 text-sm bg-blue-700 hover:bg-blue-950 rounded-full text-white'
        >
          {submitting ? `${type}...` : type}
        </button>
      </div>

    </form>
    </section>
  )
}

export default Form