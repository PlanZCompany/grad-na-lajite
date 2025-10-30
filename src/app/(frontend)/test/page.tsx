// app/produkti/page.jsx
import Image from "next/image";

export const metadata = {
  title: "Продукти | Град на Лъжите",
};

export default function Page() {
  return (
    <main className="bg-[#F8F8F6] text-[#1f1f1f] font-serif leading-relaxed">
      {/* Header */}
      <header className="w-full bg-[#200226]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3">
          <Image
            src="/Logo.png"
            alt="Лого"
            width={120}
            height={100}
            className="h-[100px] w-auto"
            priority
          />
          <nav>
            <ul className="flex list-none gap-6 md:gap-8">
              <li>
                <a
                  href="/landing.html"
                  className="text-[#FFD700] text-[1.1rem] font-bold hover:text-white transition-colors"
                >
                  Начало
                </a>
              </li>
              <li>
                <a
                  href="/siteVol3/blog.html"
                  className="text-[#FFD700] text-[1.1rem] font-bold hover:text-white transition-colors"
                >
                  Блог
                </a>
              </li>
              <li>
                <a
                  href="/produkti.html"
                  className="text-[#FFD700] text-[1.1rem] font-bold hover:text-white transition-colors"
                >
                  Продукти
                </a>
              </li>
              <li>
                <a
                  href="/siteVol2/about-us.html"
                  className="text-[#FFD700] text-[1.1rem] font-bold hover:text-white transition-colors"
                >
                  За нас
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-wrap items-center justify-center gap-6 bg-gradient-to-r from-[#fefefe] to-[#f8f8f6] px-5 py-14">
        <Image
          src="/Lice.png"
          alt="Кутията на Град на Лъжите"
          width={350}
          height={420}
          className="rounded-lg shadow-lg"
        />
        <div className="max-w-[520px]">
          <h1 className="text-[2.5rem] text-[#4B0082] drop-shadow-[0_0_8px_rgba(75,0,130,0.2)]">
            Град на Лъжите
          </h1>
          <div className="mt-2 text-[1.2rem] text-[#FFD700]">
            ⭐⭐⭐⭐⭐ (4.9/5 от 128 отзива)
          </div>
          <p className="mt-3 text-[1.1rem]">
            Българска настолна игра с карти, в която никой не казва цялата истина.
            Перфектна за партита, семейни вечери и тренинг игри.
          </p>
          <div className="mt-2 text-[1.5rem] font-bold">Цена: 49.90 лв.</div>
          <button
            type="button"
            className="mt-2 inline-block rounded-md bg-[#D4AF37] px-6 py-3 text-[1.2rem] font-bold text-black hover:bg-[#b8962e] transition-colors"
          >
            Купи сега
          </button>
          <p className="mt-2 text-[0.4rem] text-[#444]">
            * Абонирай се за новини и получи -10% код
          </p>

          <div className="mt-3 inline-block rounded-lg bg-black/60 px-4 py-3 text-[1rem] text-[#f8f6f2]">
            🚚 Доставка <strong>2-3 дни</strong> със <strong>Спиди</strong> – 4.90 лв.
            <br />📦 Безплатна при поръчки над <strong>70 лв.</strong>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="my-10 h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_6px_rgba(212,175,55,0.6)]" />

      {/* Какво има в кутията */}
      <section id="whats-in-the-box" className="mx-auto max-w-[1100px] px-5 py-5 text-center">
        <h2 className="mb-4 text-3xl text-[#4B0082] drop-shadow-[0_0_6px_rgba(75,0,130,0.3)]">
          Какво има в кутията
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <Image src="/Deckofcards.png" alt="Карти" width={100} height={100} className="mb-2 h-auto w-[100px]" />
            <p className="text-[1.15rem] leading-7">90 карти (Архетипи, Събития, Действия, Изходи)</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/Playeraids.png" alt="Помощни карти" width={100} height={100} className="mb-2 h-auto w-[100px]" />
            <p className="text-[1.15rem] leading-7">Помощни карти за улеснение</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/Rulebook.png" alt="Ръководство" width={100} height={100} className="mb-2 h-auto w-[100px]" />
            <p className="text-[1.15rem] leading-7">Ръководство за игра</p>
          </div>
        </div>

        <div className="my-5 text-center">
          <button
            type="button"
            className="rounded-md bg-[#D4AF37] px-6 py-3 text-[1.2rem] font-bold text-black hover:bg-[#b8962e] transition-colors"
          >
            Купи сега
          </button>
        </div>
      </section>

      {/* Divider */}
      <div className="my-10 h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_6px_rgba(212,175,55,0.6)]" />

      {/* Как се играе */}
      <section id="how-to-play" className="mx-auto max-w-[1100px] px-5 py-5 text-center">
        <h2 className="mb-4 text-3xl text-[#4B0082] drop-shadow-[0_0_6px_rgba(75,0,130,0.3)]">
          Как се играе
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-center">
            <Image src="/Dealing.png" alt="" width={120} height={120} className="mb-2 h-auto w-[120px]" />
            <p className="text-[1.15rem] leading-7">1. Раздай картите</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/Moving.png" alt="" width={120} height={120} className="mb-2 h-auto w-[120px]" />
            <p className="text-[1.15rem] leading-7">2. Прави ходове – Истина, Фалшификация или Саботаж</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/Points.png" alt="" width={120} height={120} className="mb-2 h-auto w-[120px]" />
            <p className="text-[1.15rem] leading-7">3. Събирай точки Истина или елиминирай опоненти</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/Winning.png" alt="" width={120} height={120} className="mb-2 h-auto w-[120px]" />
            <p className="text-[1.15rem] leading-7">4. Победи чрез една от трите цели</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="my-10 h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_6px_rgba(212,175,55,0.6)]" />

      {/* Архетипи */}
      <section id="archetypes" className="mx-auto max-w-[1100px] px-5 py-5 text-center">
        <h2 className="mb-4 text-3xl text-[#4B0082] drop-shadow-[0_0_6px_rgba(75,0,130,0.3)]">
          Специални роли – Архетипи
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-center">
            <Image src="/Analyst.png" alt="Аналитик" width={150} height={150} className="mb-2 h-auto w-[150px]" />
            <p className="text-[1.15rem] leading-7">Аналитикът – разкрива истини</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/Forger.png" alt="Фалшификатор" width={150} height={150} className="mb-2 h-auto w-[150px]" />
            <p className="text-[1.15rem] leading-7">Фалшификаторът – майстор на заблудата</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/Interrogator.png" alt="Разпитвач" width={150} height={150} className="mb-2 h-auto w-[150px]" />
            <p className="text-[1.15rem] leading-7">Разпитвачът – задава трудни въпроси</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/Saboteur.png" alt="Саботьор" width={150} height={150} className="mb-2 h-auto w-[150px]" />
            <p className="text-[1.15rem] leading-7">Саботьорът – руши плановете на другите</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="my-10 h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_6px_rgba(212,175,55,0.6)]" />

      {/* За кого е подходяща */}
      <section id="audience" className="px-5 py-14 text-center">
        <h2 className="mx-auto mb-8 max-w-[1100px] text-3xl text-[#4B0082] drop-shadow-[0_0_8px_rgba(75,0,130,0.5)]">
          За кого е подходяща играта
        </h2>
        <div className="mx-auto flex max-w-[1000px] flex-col items-center justify-center gap-8 md:flex-row md:items-center">
          <Image
            src="/Forwhom.jpg"
            alt="Играчите около маса"
            width={600}
            height={360}
            className="h-auto w-full max-w-[600px] rounded-xl shadow-md"
          />
          <p className="text-left text-[1.1rem] leading-7 text-[#2d2d2d]">
            Идеална за <strong>семейства</strong>, <strong>приятели</strong>, <strong>партита</strong> и дори{" "}
            <strong>тренинг игри</strong>. „<em>Град на Лъжите</em>“ добавя истинска{" "}
            <strong>социална стойност</strong> – тя не е просто настолна игра, а средство за{" "}
            <strong>създаване на нови спомени</strong> и <strong>засилване на връзките между хората</strong>. Играта
            развива <strong>наблюдателност</strong>, <strong>критическо мислене</strong> и{" "}
            <strong>умения за аргументация</strong>, което я прави чудесен <strong>ледоразбивач</strong> за всяка
            компания.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="my-10 h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_6px_rgba(212,175,55,0.6)]" />

      {/* Мнения */}
      <section id="reviews" className="mx-auto max-w-[1100px] px-5 py-5 text-center">
        <h2 className="mb-4 text-3xl text-[#4B0082] drop-shadow-[0_0_6px_rgba(75,0,130,0.3)]">
          Мнения на играчи
        </h2>

        <div className="mx-auto my-4 max-w-[700px] rounded-xl border border-[#ddd] bg-white p-5 shadow">
          <p className="text-[1.15rem] leading-7">„Уникална игра, никога не знаеш кой лъже! Смях до сълзи.“</p>
          <span className="mt-2 block italic text-[#555]">— Мария, 28 г.</span>
        </div>

        <div className="mx-auto my-4 max-w-[700px] rounded-xl border border-[#ddd] bg-white p-5 shadow">
          <p className="text-[1.15rem] leading-7">
            „Играхме с колегите и всички искаха реванш. Атмосферата е страхотна!“
          </p>
          <span className="mt-2 block italic text-[#555]">— Иван, 35 г.</span>
        </div>

        <div className="mx-auto my-4 max-w-[700px] rounded-xl border border-[#ddd] bg-white p-5 shadow">
          <p className="text-[1.15rem] leading-7">
            „Децата се научиха да мислят стратегически. Препоръчвам за семейства.“
          </p>
          <span className="mt-2 block italic text-[#555]">— Петър, 42 г.</span>
        </div>

        <div className="my-5 text-center">
          <button
            type="button"
            className="rounded-md bg-[#D4AF37] px-6 py-3 text-[1.2rem] font-bold text-black hover:bg-[#b8962e] transition-colors"
          >
            Купи сега
          </button>
        </div>
      </section>

      {/* Divider */}
      <div className="my-10 h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_6px_rgba(212,175,55,0.6)]" />

      {/* FAQ */}
      <section className="bg-[#f8f8f6] px-5 py-20">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-12 md:flex-row">
          <div className="shrink-0">
            <Image src="/FAQ.png" alt="FAQ секция" width={320} height={320} />
          </div>
          <div className="flex-1 text-center">
            <h2 className="mb-4 text-[2.2rem] font-bold text-[#4b2e83] drop-shadow-[0_0_12px_rgba(75,46,131,0.4)]">
              Често задавани… и често измисляни въпроси
            </h2>
            <p className="mx-auto mb-6 max-w-[720px] text-[1.25rem] leading-7 text-[#333]">
              Имаш въпроси за правилата или стратегиите? Ние сме събрали въпроси и отговори, за да ти е лесно и удобно.
              Разгледай специалната статия в блога, където ще намериш още полезни съвети и примери.
            </p>
            <a
              href="/siteVol3/faq-invented.html"
              className="inline-block rounded-lg bg-[#d4af37] px-7 py-3 text-[1.1rem] font-bold text-black transition-all hover:scale-105 hover:bg-[#b9972c]"
            >
              Виж тук
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="my-10 h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_6px_rgba(212,175,55,0.6)]" />

      {/* Subscribe */}
      <section id="subscribe" className="mx-auto max-w-[1100px] px-5 py-5 text-center">
        <h2 className="mb-4 text-3xl text-[#4B0082] drop-shadow-[0_0_6px_rgba(75,0,130,0.3)]">Абонирай се</h2>

        <div className="subscribe-container mt-5 flex flex-wrap items-center justify-center gap-10">
          <div className="subscribe-left">
            <Image
              src="/Aboniraise.jpg"
              alt="Абонирай се"
              width={220}
              height={220}
              className="rounded-lg"
            />
          </div>

          <div className="subscribe-right max-w-[420px] text-left">
            <p className="text-[1.15rem] leading-7">
              Абонирай се за новини и получи <strong>-10% код</strong> за първата поръчка.*
            </p>
            <form className="subscribe-form mt-3 flex">
              <input
                type="email"
                placeholder="Въведи своя имейл"
                required
                className="flex-1 rounded-l-md border border-[#ccc] px-3 py-2 text-base outline-none"
              />
              <button
                type="submit"
                className="rounded-r-md border-0 bg-[#D4AF37] px-5 py-2 font-bold text-white transition-colors hover:bg-[#b8962e]"
              >
                Абонирай се
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Chat buttons (fixed) */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2">
        <a href="https://m.me/yourpage" target="_blank" rel="noreferrer">
          <Image src="/siteVol2/Messenger.png" alt="Messenger" width={40} height={40} />
        </a>
        <a href="https://wa.me/359896042138" target="_blank" rel="noreferrer">
          <Image src="/siteVol2/WhatsApp.svg" alt="WhatsApp" width={40} height={40} />
        </a>
        <a href="viber://chat?number=%2B359896042138" target="_blank" rel="noreferrer">
          <Image src="/siteVol2/Viber.svg" alt="Viber" width={40} height={40} />
        </a>
      </div>

      {/* Footer (full-width background) */}
      <footer
        className="w-full bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Footer.jpg')" }}
      >
        <div className="mx-auto max-w-[1600px] px-6 py-10">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-10 shadow-[inset_0_0_30px_rgba(255,215,0,0.15),inset_0_0_60px_rgba(255,215,0,0.08)] backdrop-blur-sm">
            <div className="flex w-full flex-col items-center justify-between gap-10 md:flex-row">
              {/* Left */}
              <div className="flex-1 text-center text-[#f5c542]">
                <Image src="/Logo.png" alt="Лого" width={150} height={150} className="mx-auto mb-4" />
                <p>© 2025 Град на Лъжите. Всички права запазени.</p>
                <p>Създадено с ❤️ от anilevi.soulwalks™ games</p>
              </div>

              {/* Center */}
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <a href="https://instagram.com/gradnalajite" target="_blank" rel="noreferrer">
                    <Image
                      src="/Instagram.png"
                      alt="Instagram"
                      width={200}
                      height={200}
                      className="mx-4 transition-transform hover:scale-110 hover:shadow-[0_0_15px_rgba(255,215,0,0.7)] hover:rounded-full"
                    />
                  </a>
                  <a href="https://www.facebook.com/gradnalajite" target="_blank" rel="noreferrer">
                    <Image
                      src="/Facebook.png"
                      alt="Facebook"
                      width={200}
                      height={200}
                      className="mx-4 transition-transform hover:scale-110 hover:shadow-[0_0_15px_rgba(255,215,0,0.7)] hover:rounded-full"
                    />
                  </a>
                </div>

                <div className="mt-3">
                  <span className="inline-block rounded-2xl bg-[#D4AF37] px-3 py-2 text-white shadow hover:shadow-[0_0_10px_#FFD966,0_0_20px_#FFD966,0_0_30px_#D4AF37] hover:text-[#2E1A47]">
                    <Image src="/siteVol2/SSLSecure.png" alt="SSL Secure" width={100} height={100} />
                  </span>
                  <span className="ml-2 inline-block rounded-2xl bg-[#D4AF37] px-3 py-2 text-white shadow hover:shadow-[0_0_10px_#FFD966,0_0_20px_#FFD966,0_0_30px_#D4AF37] hover:text-[#2E1A47]">
                    <Image src="/siteVol2/GDPRCompliant.png" alt="GDPR Compliant" width={100} height={100} />
                  </span>
                  <span className="ml-2 inline-block rounded-2xl bg-[#D4AF37] px-3 py-2 text-white shadow hover:shadow-[0_0_10px_#FFD966,0_0_20px_#FFD966,0_0_30px_#D4AF37] hover:text-[#2E1A47]">
                    <Image src="/siteVol2/SSLSecure.png" alt="SSL Secure" width={100} height={100} />
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="flex-1">
                <div className="flex flex-wrap justify-end gap-2">
                  <Image src="/siteVol2/speedy-logo.png" alt="Спиди" width={90} height={40} />
                  <Image src="/siteVol2/applepay.svg" alt="Apple Pay" width={90} height={40} />
                  <Image src="/siteVol2/googlepay.png" alt="Google Pay" width={90} height={40} />
                  <Image src="/siteVol2/visa.png" alt="Visa" width={90} height={40} />
                  <Image src="/siteVol2/mastercard.png" alt="Mastercard" width={90} height={40} />
                </div>

                <ul className="mt-5 list-none space-y-2 text-right">
                  <li>
                    <a href="/siteVol2/terms-and-conditions.html" className="text-[#f5c542] hover:text-white transition-colors">
                      Общи условия за ползване и продажба
                    </a>
                  </li>
                  <li>
                    <a href="/siteVol2/privacy-policy.html" className="text-[#f5c542] hover:text-white transition-colors">
                      Политика за поверителност
                    </a>
                  </li>
                  <li>
                    <a href="/siteVol2/cookie-policy.html" className="text-[#f5c542] hover:text-white transition-colors">
                      Политика за бисквитки
                    </a>
                  </li>
                  <li>
                    <a href="/siteVol2/contact.html" className="text-[#f5c542] hover:text-white transition-colors">
                      Контакти
                    </a>
                  </li>
                  <li>
                    <a href="/siteVol2/shipping-and-returns.html" className="text-[#f5c542] hover:text-white transition-colors">
                      Политика за доставка и връщане
                    </a>
                  </li>
                  <li>
                    <a href="/siteVol2/payments.html" className="text-[#f5c542] hover:text-white transition-colors">
                      Политика за плащания
                    </a>
                  </li>
                  <li>
                    <a href="/siteVol2/faq.html" className="text-[#f5c542] hover:text-white transition-colors">
                      Често задавани въпроси
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}