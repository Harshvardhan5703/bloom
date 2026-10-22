import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Clock3,
  Link2,
  Mic,
  MoreHorizontal,
  PhoneOff,
  Plus,
  Video,
  VideoOff,
} from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";

const benefits = [
  {
    number: "01",
    icon: Video,
    title: "Start a quick meeting",
    description:
      "Open an instant meeting when a conversation is better than another thread.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Make time for the work",
    description:
      "Schedule a meeting ahead and keep upcoming plans easy to find.",
  },
  {
    number: "03",
    icon: Link2,
    title: "Share a meeting link",
    description:
      "Copy an invitation URL and send it to the people who need to join.",
  },
  {
    number: "04",
    icon: Clock3,
    title: "Pick up where you left off",
    description:
      "Find past calls and available recordings alongside your meeting workspace.",
  },
];

const steps = [
  {
    number: "01",
    title: "Start or schedule",
    description:
      "Begin an instant call or choose a time that works for everyone.",
  },
  {
    number: "02",
    title: "Share your invite",
    description:
      "Copy the meeting link and send it to the people you want in the room.",
  },
  {
    number: "03",
    title: "Get to the good part",
    description:
      "Join from your workspace and focus on the conversation in front of you.",
  },
];

function MeetingPreview() {
  return (
    <div
      role="img"
      aria-label="Illustrative preview of a Bloom video meeting"
      className="relative mx-auto w-full max-w-[570px] lg:ml-auto"
    >
      <div className="absolute -right-5 -top-5 size-28 rounded-full border border-[#d4dfd5] sm:-right-8 sm:-top-8 sm:size-36" />
      <div className="absolute -bottom-7 -left-7 size-24 rounded-full bg-[#e8ecdf] sm:-bottom-10 sm:-left-10 sm:size-32" />
      <div className="relative overflow-hidden rounded-[26px] border border-[#e2e3dd] bg-white p-3 shadow-[0_28px_70px_-35px_rgba(32,59,48,0.38)] sm:rounded-[30px] sm:p-4">
        <div className="flex items-center justify-between border-b border-[#eeefeb] px-2 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-xl bg-[#e9f0e9] text-[#315d4b]">
              <Video size={16} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold text-[#28342e] sm:text-sm">
                A quick catch-up
              </p>
              <p className="mt-0.5 text-[10px] text-[#818982] sm:text-[11px]">
                Illustrative meeting preview
              </p>
            </div>
          </div>
          <span className="rounded-lg p-2 text-[#777f79]">
            <MoreHorizontal size={18} aria-hidden="true" />
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 py-3 sm:gap-3 sm:py-4">
          <div className="relative flex aspect-[1.14] items-end overflow-hidden rounded-[18px] bg-[#d9e2da] p-3 sm:rounded-[20px] sm:p-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_32%,#f0ddc4_0_14%,transparent_15%),radial-gradient(ellipse_at_66%_65%,#879f8b_0_28%,transparent_29%),linear-gradient(145deg,#c4d1c6,#e9e6d8)]" />
            <span className="relative rounded-full bg-[#17211e]/65 px-2.5 py-1 text-[10px] font-medium text-white sm:text-xs">
              You
            </span>
          </div>
          <div className="relative flex aspect-[1.14] items-end overflow-hidden rounded-[18px] bg-[#e9dfd1] p-3 sm:rounded-[20px] sm:p-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_42%_33%,#e8c9a9_0_14%,transparent_15%),radial-gradient(ellipse_at_42%_69%,#b78064_0_29%,transparent_30%),linear-gradient(145deg,#eee3d4,#d8c8b5)]" />
            <span className="relative rounded-full bg-[#17211e]/65 px-2.5 py-1 text-[10px] font-medium text-white sm:text-xs">
              Alex · illustrative
            </span>
          </div>
          <div className="relative flex aspect-[1.14] items-end overflow-hidden rounded-[18px] bg-[#d9dfe5] p-3 sm:rounded-[20px] sm:p-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_61%_34%,#e9c5a4_0_14%,transparent_15%),radial-gradient(ellipse_at_61%_68%,#63798c_0_29%,transparent_30%),linear-gradient(145deg,#c8d7df,#e3ded1)]" />
            <span className="relative rounded-full bg-[#17211e]/65 px-2.5 py-1 text-[10px] font-medium text-white sm:text-xs">
              Sam · illustrative
            </span>
          </div>
          <div className="flex aspect-[1.14] flex-col items-center justify-center rounded-[18px] bg-[#f1f2ed] text-center sm:rounded-[20px]">
            <div className="flex -space-x-2">
              <span className="flex size-9 items-center justify-center rounded-full border-2 border-[#f1f2ed] bg-[#c3d0c2] text-[10px] font-semibold text-[#34473a]">
                A
              </span>
              <span className="flex size-9 items-center justify-center rounded-full border-2 border-[#f1f2ed] bg-[#dfc9b6] text-[10px] font-semibold text-[#594536]">
                S
              </span>
            </div>
            <p className="mt-2 text-[10px] font-medium text-[#69726b] sm:text-xs">
              Room for everyone
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#f7f8f5] px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="hidden items-center gap-2 text-[11px] text-[#7b837c] sm:flex">
            <span className="size-2 rounded-full bg-[#72a07d]" />
            Meeting in progress
          </div>
          <div className="mx-auto flex items-center gap-2 sm:mx-0 sm:gap-3">
            <span className="flex size-9 items-center justify-center rounded-full border border-[#e2e5df] bg-white text-[#536057]">
              <Mic size={15} aria-hidden="true" />
            </span>
            <span className="flex size-9 items-center justify-center rounded-full border border-[#e2e5df] bg-white text-[#536057]">
              <Video size={15} aria-hidden="true" />
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-[#a54f44] text-white">
              <PhoneOff size={15} aria-hidden="true" />
            </span>
            <span className="hidden size-9 items-center justify-center rounded-full border border-[#e2e5df] bg-white text-[#536057] sm:flex">
              <VideoOff size={15} aria-hidden="true" />
            </span>
          </div>
          <span className="hidden text-[11px] font-medium text-[#69726b] sm:block">
            12:08
          </span>
        </div>
      </div>
    </div>
  );
}

function WorkspacePreview() {
  return (
    <div
      role="img"
      aria-label="Illustrative preview of the Bloom meeting dashboard"
      className="overflow-hidden rounded-[24px] border border-[#dfe2dc] bg-white shadow-[0_30px_80px_-45px_rgba(32,59,48,0.45)] sm:rounded-[30px]"
    >
      <div className="flex min-h-[370px] sm:min-h-[420px]">
        <aside className="hidden w-[185px] shrink-0 border-r border-[#eef0eb] bg-[#fbfcfa] p-5 sm:block">
          <div className="flex items-center gap-2">
            <Image src="/icons/logo.svg" width={23} height={23} alt="" />
            <span className="text-sm font-bold tracking-[-0.06em] text-[#23342b]">
              bloom
            </span>
          </div>
          <p className="mb-3 mt-8 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a1a8a0]">
            Workspace
          </p>
          <div className="space-y-1 text-xs font-medium">
            <div className="rounded-lg bg-[#eaf0e9] px-3 py-2.5 text-[#315d4b]">
              Home
            </div>
            <div className="px-3 py-2.5 text-[#737d75]">Upcoming</div>
            <div className="px-3 py-2.5 text-[#737d75]">Previous</div>
            <div className="px-3 py-2.5 text-[#737d75]">Recordings</div>
            <div className="px-3 py-2.5 text-[#737d75]">Personal room</div>
          </div>
          <div className="mt-10 rounded-xl border border-[#e7eae4] p-3">
            <p className="text-[10px] font-semibold text-[#45554a]">
              Your space, ready
            </p>
            <p className="mt-1 text-[10px] leading-4 text-[#89918a]">
              Start a call whenever the moment is right.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between">
            <div className="sm:hidden">
              <p className="text-xs font-bold tracking-[-0.06em] text-[#23342b]">
                bloom
              </p>
            </div>
            <p className="hidden text-xs font-medium text-[#879087] sm:block">
              YOUR MEETING SPACE
            </p>
            <span className="flex size-8 items-center justify-center rounded-full bg-[#edf0e9] text-xs font-semibold text-[#546450]">
              B
            </span>
          </div>
          <p className="mt-9 text-xs font-medium text-[#879087]">A fresh start</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.055em] text-[#26362d] sm:text-3xl">
            Make room for a good conversation.
          </h3>
          <p className="mt-2 max-w-md text-xs leading-5 text-[#858e86] sm:text-sm">
            Your meetings, plans, and personal room—ready when you are.
          </p>

          <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3">
            {[
              { icon: Video, label: "New meeting", tone: "bg-[#eaf0e9]" },
              { icon: Link2, label: "Join meeting", tone: "bg-[#eef0f4]" },
              { icon: CalendarDays, label: "Schedule", tone: "bg-[#f4eee8]" },
            ].map(({ icon: Icon, label, tone }) => (
              <div
                key={label}
                className="rounded-2xl border border-[#eef0eb] bg-white p-3.5 sm:p-4"
              >
                <span
                  className={`flex size-8 items-center justify-center rounded-xl ${tone} text-[#456452]`}
                >
                  <Icon size={15} aria-hidden="true" />
                </span>
                <p className="mt-3 text-xs font-semibold text-[#3d4c42]">
                  {label}
                </p>
                <p className="mt-1 text-[10px] text-[#9aa19b]">
                  Start in a moment
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#f8f9f6] px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-white text-[#788579]">
                <Clock3 size={16} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold text-[#536056]">
                  Your meeting history
                </p>
                <p className="mt-1 text-[10px] text-[#9aa19b]">
                  Past calls and available recordings
                </p>
              </div>
            </div>
            <ArrowRight size={16} className="text-[#8b958b]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PublicLanding() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#26342d]">
      <PublicNavbar />
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-14 overflow-hidden px-5 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-12 lg:pb-28 lg:pt-24">
          <div className="max-w-xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e4e6df] bg-white/70 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#627367]">
              <span className="size-1.5 rounded-full bg-[#527a5e]" />
              A calmer way to meet
            </p>
            <h1 className="max-w-[620px] text-[clamp(3.25rem,7vw,5.8rem)] font-medium leading-[0.99] tracking-[-0.075em] text-[#1e2d25]">
              Better conversations start here.
            </h1>
            <p className="mt-6 max-w-[470px] text-base leading-7 text-[#6d7770] sm:text-lg sm:leading-8">
              A simpler space for meetings, collaboration, and the conversations
              that move work forward.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/sign-up"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#203b30] px-6 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgba(32,59,48,0.8)] transition hover:-translate-y-0.5 hover:bg-[#315746] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315d4b]"
              >
                Get started <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[#546259] transition hover:bg-[#efeee8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315d4b]"
              >
                Explore how it works
                <ArrowDownRight size={16} aria-hidden="true" />
              </a>
            </div>
            <p className="mt-7 text-xs text-[#959c95]">
              Meetings made for the work—and the people—behind them.
            </p>
          </div>
          <MeetingPreview />
        </section>

        <section
          id="benefits"
          className="scroll-mt-24 border-y border-[#eae9e3] bg-[#f3f2ed]"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#6a806f]">
                  A little less friction
                </p>
                <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.055em] text-[#26362d] sm:text-4xl">
                  Everything you need to get a conversation moving.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#788078]">
                Keep the essentials close, from a quick call to a meeting you
                planned together.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ number, icon: Icon, title, description }) => (
                <article
                  key={number}
                  className="group rounded-[20px] border border-[#e5e6df] bg-[#faf9f6] p-5 transition hover:-translate-y-1 hover:border-[#cdd8cc] hover:shadow-[0_16px_40px_-30px_rgba(32,59,48,0.4)] sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-[14px] bg-[#e9efe7] text-[#42634d]">
                      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="text-xs font-medium tracking-[0.08em] text-[#afb5ad]">
                      {number}
                    </span>
                  </div>
                  <h3 className="mt-7 text-base font-semibold tracking-[-0.025em] text-[#2d3d33]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#7b847c]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-12"
        >
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#6a806f]">
              From invite to hello
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.055em] text-[#26362d] sm:text-4xl">
              Three small steps. One good conversation.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#788078] sm:text-base">
              Bloom keeps the path to a meeting straightforward, whether you
              need to talk now or find a time later.
            </p>
          </div>
          <ol className="divide-y divide-[#e9e9e3]">
            {steps.map((step) => (
              <li
                key={step.number}
                className="grid grid-cols-[48px_1fr] gap-4 py-5 first:pt-0 last:pb-0 sm:grid-cols-[58px_1fr] sm:gap-6 sm:py-6"
              >
                <span className="pt-1 text-xs font-semibold tracking-[0.12em] text-[#87a08b]">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.03em] text-[#2d3d33]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-sm leading-6 text-[#7b847c]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="product"
          className="scroll-mt-24 border-y border-[#e8e9e2] bg-[#eef0e9]"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="mb-11 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#6a806f]">
                  Your meeting space
                </p>
                <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.055em] text-[#26362d] sm:text-4xl">
                  The useful things, all in one place.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#788078]">
                Start, join, or plan a meeting from a clear workspace that
                keeps your calls easy to find.
              </p>
            </div>
            <WorkspacePreview />
            <p className="mt-4 text-center text-[11px] text-[#858e86]">
              Illustrative product preview; interface details may vary.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="relative overflow-hidden rounded-[28px] bg-[#203b30] px-6 py-12 text-center sm:rounded-[34px] sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-12 -top-28 size-72 rounded-full border border-white/10 sm:-right-4 sm:-top-44 sm:size-96" />
            <div className="pointer-events-none absolute -bottom-36 -left-24 size-72 rounded-full border border-white/10 sm:-bottom-52 sm:-left-12 sm:size-96" />
            <div className="relative mx-auto max-w-2xl">
              <span className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-white/10 text-[#d6e2d5]">
                <Plus size={21} aria-hidden="true" />
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.17em] text-[#b8c9b8]">
                Make space for better work
              </p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.055em] text-white sm:text-5xl">
                Start your next conversation with Bloom.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#d0d9d0] sm:text-base">
                Bring your people together for the work that matters.
              </p>
              <Link
                href="/sign-up"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f5f5ef] px-6 text-sm font-semibold text-[#243a2e] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Get started <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e9e7e1] bg-[#f3f2ed]">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/icons/logo.svg" width={25} height={25} alt="" />
            <span className="text-lg font-bold tracking-[-0.07em] text-[#23342b]">
              bloom
            </span>
          </Link>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
            <a href="#benefits" className="text-xs font-medium text-[#727c73] hover:text-[#26362d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#315d4b]">
              Why Bloom
            </a>
            <a href="#how-it-works" className="text-xs font-medium text-[#727c73] hover:text-[#26362d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#315d4b]">
              How it works
            </a>
            <Link href="/sign-in" className="text-xs font-medium text-[#727c73] hover:text-[#26362d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#315d4b]">
              Sign in
            </Link>
            <Link href="/sign-up" className="text-xs font-medium text-[#727c73] hover:text-[#26362d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#315d4b]">
              Get started
            </Link>
          </nav>
          <p className="text-xs text-[#9aa19b]">A better space to meet.</p>
        </div>
      </footer>
    </div>
  );
}
