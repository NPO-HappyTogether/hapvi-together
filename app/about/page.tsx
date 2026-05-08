import { Heart, Unlock, Users } from "lucide-react";

const team = [
  {
    // [PLACEHOLDER] 이름 확정 후 교체
    name: "[이름]",
    // [PLACEHOLDER] 역할 확정 후 교체
    role: "[역할]",
    // [PLACEHOLDER] 한 줄 소개 확정 후 교체
    bio: "[한 줄 소개]",
    // [PLACEHOLDER] 팀원 사진 파일명 확정 후 교체
    image: "/images/team/[파일명].jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-3xl px-4 pb-16 pt-24">
        <h1 className="text-4xl font-bold text-gray-900">
          이 커뮤니티 안에서 시작되었습니다.
        </h1>
        <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-gray-700">
          미국에는 저소득 가정을 위한 다양한 주거 지원과 복지 프로그램이 있습니다.
          {"\n"}하지만 영어 장벽, 복잡한 절차, 어디서 물어봐야 할지 모르는 상황 때문에
          {"\n"}많은 한인 가정이 마땅히 받아야 할 혜택을 받지 못하고 있습니다.
          {"\n"}
          {"\n"}HapVi Together는 그 간격을 채우기 위해
          {"\n"}LA 한인 커뮤니티 안에서 설립된 비영리 단체입니다.
          {"\n"}
          {"\n"}이름처럼 — Happy Village Together —
          {"\n"}함께 더 나은 마을을 만들어가는 것이 우리의 시작입니다.
        </p>
      </section>

      <section className="bg-hapvi-light px-4 py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2 md:gap-12">
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-hapvi-primary">미션</p>
            <p className="mt-4 text-xl font-medium leading-relaxed text-gray-900">
              LA 한인 가정이 언어와 정보의 장벽 없이
              <br />
              미국의 주거 지원과 정부 혜택을 온전히 누릴 수 있도록 함께합니다.
            </p>
          </article>
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-hapvi-primary">비전</p>
            <p className="mt-4 text-xl font-medium leading-relaxed text-gray-900">
              모든 한인 가정이 안정된 집에서 시작해,
              <br />
              이 땅에서 다음 세대를 위한 삶을 만들어갈 수 있는 커뮤니티.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <h2 className="text-center text-2xl font-bold text-gray-900">우리가 일하는 방식</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <Users className="h-7 w-7 text-hapvi-primary" />
            <h3 className="mt-4 text-xl font-bold text-gray-900">동행</h3>
            <p className="mt-3 text-gray-600">
              대신 해주는 것이 아닌, 옆에서 함께하는 방식으로 일합니다.
            </p>
          </article>
          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <Unlock className="h-7 w-7 text-hapvi-primary" />
            <h3 className="mt-4 text-xl font-bold text-gray-900">접근성</h3>
            <p className="mt-3 text-gray-600">
              언어·비용·신분의 장벽 없이 누구나 도움을 받을 수 있어야 합니다.
            </p>
          </article>
          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <Heart className="h-7 w-7 text-hapvi-primary" />
            <h3 className="mt-4 text-xl font-bold text-gray-900">커뮤니티</h3>
            <p className="mt-3 text-gray-600">우리 안에서, 우리를 위해 존재합니다.</p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pb-20">
        <h2 className="text-2xl font-bold text-gray-900">함께하는 사람들</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {team.map((member) => (
            <article
              key={`${member.name}-${member.role}`}
              className="rounded-2xl border border-dashed border-gray-300 bg-white p-6"
            >
              <p className="text-lg font-bold text-gray-900">{member.name}</p>
              <p className="mt-1 text-sm font-medium text-hapvi-primary">{member.role}</p>
              <p className="mt-3 text-gray-600">{member.bio}</p>
              <p className="mt-3 text-xs text-gray-400">{member.image}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#F1EFE8] px-4 py-12 text-center">
        <p className="text-lg font-medium text-gray-900">
          HapVi Together는 캘리포니아 주 등록 501(c)(3) 비영리 단체입니다.
        </p>
        <p className="mt-3 text-base text-gray-600">모든 서비스는 무료로 제공됩니다.</p>
      </section>
    </div>
  );
}
