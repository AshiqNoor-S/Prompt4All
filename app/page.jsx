import Feed from '@components/Feed'


const Home = () => {
  return (
    <section className="w-full flex-center flex-col border-blue-700">
      <h1 className="head_text text-center">
        Craft <span className='text-blue-600'>&</span> Share
        <br/>
        <span className="blue_gradient text-center">AI-Powered Prompts</span>
        </h1>
        
        <p className="desc text-center">
          Prompt4All is a platform that provides an open-source collection of AI-Powered prompts
        </p>

        <Feed/>
    </section>
  )
}

export default Home;