import { CTAButton } from "./components/CTAButton";
import { ConversationStage } from "./components/ConversationStage";
import { EditorialImage } from "./components/EditorialImage";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { ManifestoStatement } from "./components/ManifestoStatement";
import { Navigation } from "./components/Navigation";
import { NewsletterForm } from "./components/NewsletterForm";
import { Reveal } from "./components/Reveal";
import { SectionHeading } from "./components/SectionHeading";
import { SocialLinks } from "./components/SocialLinks";
import { StorySubmissionForm } from "./components/StorySubmissionForm";
import { StoryThemeCard } from "./components/StoryThemeCard";
import { TeamMemberCard } from "./components/TeamMemberCard";
import { VideoPlaceholder } from "./components/VideoPlaceholder";
import { siteConfig } from "./config/site";
import { conversationStages, manifesto, storyThemes } from "./data/content";
import { teamMembers } from "./data/team";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />

        <section id="vision" className="section-pad overflow-hidden bg-ivory">
          <div className="page-shell">
            <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-20">
              <div>
                <Reveal>
                  <p className="eyebrow">The central belief</p>
                  <h2 className="mt-5 max-w-4xl font-display text-[clamp(3.5rem,7.3vw,7.6rem)] leading-[0.88] tracking-[-0.035em] text-charcoal">
                    You do not have to arrive before your story matters.
                  </h2>
                </Reveal>
                <Reveal delay={0.08} className="mt-9 max-w-2xl space-y-5 text-base leading-8 text-ink/65 sm:text-lg">
                  <p>Most stories are told after the breakthrough, after the recognition or after everything finally makes sense.</p>
                  <p className="font-display text-4xl leading-none text-charcoal">We are interested in the middle.</p>
                  <p>The uncertain chapters. The private battles. The decisions nobody applauded. The process of becoming someone you have never been before.</p>
                  <p>This is a space for honest stories from people who are still building, learning, questioning and moving.</p>
                </Reveal>
              </div>
              <Reveal className="relative min-h-[39rem] sm:min-h-[48rem]">
                <EditorialImage src="/images/portrait-woman.jpg" alt="A woman photographed in natural light — editorial portrait placeholder" className="absolute left-0 top-0 h-[76%] w-[78%]" />
                <EditorialImage src="/images/portrait-man.jpg" alt="A man in a quiet documentary-style portrait — editorial portrait placeholder" className="absolute bottom-0 right-0 h-[43%] w-[55%] border-[0.65rem] border-ivory" label="Portrait placeholder" />
                <blockquote className="absolute bottom-[2%] left-0 z-10 max-w-[15rem] bg-clay p-5 font-display text-2xl leading-tight text-ivory sm:max-w-[19rem] sm:p-7 sm:text-3xl">
                  “The journey is not less meaningful because it is unfinished.”
                </blockquote>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-pad relative overflow-hidden bg-charcoal text-ivory">
          <div className="grain absolute inset-0 opacity-20" />
          <div className="page-shell relative grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <SectionHeading eyebrow="Why we exist" title="The conversations we wished more people could hear." theme="dark" />
            <Reveal delay={0.08} className="max-w-3xl space-y-6 text-base leading-8 text-white/62 sm:text-lg">
              <p>This idea began within a mentorship community that encouraged us to think deeply, live intentionally and take responsibility for our growth.</p>
              <p>As we met people from different countries, careers and seasons of life, we realised how many remarkable stories were hidden behind ordinary introductions.</p>
              <p>There were immigrants rebuilding their lives, professionals questioning their direction, founders creating with limited resources, families navigating change and individuals learning to confront fear with faith.</p>
              <p>We created {siteConfig.name} to make room for those stories.</p>
              <p className="font-display text-3xl leading-tight text-ivory sm:text-4xl">Not because we have all the answers, but because we believe the right conversation can help someone discover their own.</p>
            </Reveal>
          </div>
          <Reveal className="page-shell relative mt-20">
            <div className="grid gap-0 border-y border-white/15 sm:grid-cols-4">
              {["Community", "Conversation", "Clarity", "Courage"].map((item, index) => (
                <div key={item} className="relative flex min-h-28 items-center justify-between border-b border-white/15 px-5 font-display text-2xl last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <span>{item}</span>
                  <span className="font-sans text-[0.58rem] tracking-[0.16em] text-copper">0{index + 1}</span>
                  {index < 3 && <span className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-copper bg-charcoal sm:block" />}
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="stories" className="section-pad bg-ivory">
          <div className="page-shell">
            <SectionHeading eyebrow="Stories we explore" title="The subjects beneath the surface." description="Eight recurring territories. Countless individual lives. Every conversation begins with a person, never a category." />
            <div className="mt-16 grid gap-x-10 sm:mt-20 md:grid-cols-2">
              {storyThemes.map((theme) => <StoryThemeCard key={theme.number} theme={theme} />)}
            </div>
          </div>
        </section>

        <section id="experience" className="section-pad bg-[#1e1d1b] text-ivory">
          <div className="page-shell">
            <SectionHeading eyebrow="The conversation experience" title="More than an interview. A space to see clearly." description="The goal is not to extract dramatic stories or manufacture inspirational moments. It is to create the kind of thoughtful environment where people can speak honestly, examine their journeys and recognise what their experiences have been teaching them." theme="dark" />
            <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-4 lg:gap-7">
              {conversationStages.map((stage) => <ConversationStage key={stage.number} stage={stage} />)}
            </div>
          </div>
        </section>

        <section id="first-listeners" className="section-pad bg-charcoal text-ivory">
          <div className="page-shell">
            <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
              <SectionHeading eyebrow="Upcoming conversations" title="The first stories are being prepared." theme="dark" />
              <Reveal className="max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
                <p>We are currently meeting potential guests, developing the format and preparing our first season of conversations.</p>
                <p className="mt-5">The first episodes will explore identity, migration, career transitions, mentorship, faith, family and the courageous decisions people make when nobody is watching.</p>
              </Reveal>
            </div>
            <Reveal className="mt-14"><VideoPlaceholder /></Reveal>
            <div className="mt-10 grid gap-8 border-t border-white/15 pt-10 lg:grid-cols-[.8fr_1.2fr]">
              <Reveal>
                <p className="eyebrow">Before episode one</p>
                <h3 className="mt-4 font-display text-4xl leading-none sm:text-5xl">Be there when the first conversation begins.</h3>
              </Reveal>
              <Reveal delay={0.08}><NewsletterForm /></Reveal>
            </div>
          </div>
        </section>

        <section id="share" className="section-pad overflow-hidden bg-[#d8b69e]">
          <div className="page-shell">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
              <SectionHeading eyebrow="Someone needs to hear it" title="Your story does not have to be perfect. It only has to be honest." description="You may be navigating a transition, building something quietly, recovering from disappointment or carrying a lesson that could help someone else move forward. You can share your own story, nominate someone you know or suggest a subject that deserves a deeper conversation." />
              <Reveal className="relative min-h-[24rem] sm:min-h-[32rem]">
                <EditorialImage src="/images/portrait-man.jpg" alt="A thoughtful portrait — story submission section placeholder" className="absolute inset-0" />
                <div className="absolute -bottom-5 -left-5 max-w-[12rem] border border-charcoal bg-[#d8b69e] p-5 font-display text-2xl leading-tight text-charcoal sm:max-w-[15rem] sm:text-3xl">This could be your story.</div>
              </Reveal>
            </div>
            <StorySubmissionForm />
          </div>
        </section>

        <section id="about" className="section-pad bg-paper">
          <div className="page-shell">
            <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
              <SectionHeading eyebrow="The founding story" title="We are listeners before we are hosts." />
              <Reveal className="space-y-5 text-base leading-8 text-ink/65 sm:text-lg">
                <p>{siteConfig.name} was started by a group of people connected through a shared mentorship experience and a desire to carry meaningful conversations beyond private rooms.</p>
                <p>We are not building a platform because we believe we have mastered life.</p>
                <p>We are building it because we have experienced how much can change when people are given the opportunity to speak, reflect and be truly heard.</p>
                <p>Our role is to ask thoughtful questions, protect the dignity of every guest and create conversations that remain useful long after an episode ends.</p>
              </Reveal>
            </div>
            <div className="mt-16 grid gap-12 md:grid-cols-3">
              {teamMembers.map((member, index) => <Reveal key={`${member.name}-${index}`} delay={index * 0.06}><TeamMemberCard member={member} /></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section-pad relative overflow-hidden bg-charcoal">
          <div className="grain absolute inset-0 opacity-25" />
          <div className="page-shell relative">
            <p className="eyebrow mb-10">A manifesto for the unfinished</p>
            {manifesto.map((statement, index) => <ManifestoStatement key={statement} statement={statement} index={index} />)}
          </div>
        </section>

        <section className="section-pad bg-clay text-ivory">
          <div className="page-shell text-center">
            <Reveal className="mx-auto max-w-5xl">
              <p className="eyebrow text-white/65">The next story begins here</p>
              <h2 className="mt-6 font-display text-[clamp(3.5rem,8vw,8.5rem)] leading-[0.86] tracking-[-0.035em]">One honest conversation can change the direction of a life.</h2>
              <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">Join us as we listen to the stories of people becoming more courageous, more intentional and more fully themselves.</p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <CTAButton href="#first-listeners" variant="light">Join the First Listeners</CTAButton>
                <CTAButton href="#share" variant="outline">Share Your Story</CTAButton>
              </div>
              <div className="mt-10 flex justify-center"><SocialLinks labels /></div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
