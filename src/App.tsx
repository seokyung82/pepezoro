
import { useEffect, useState, type CSSProperties } from "react";

type Character = {
  id: string;
  name: string;
  product: string;
  color: string;
  image: string;
  heartStart: string;
  heartEnd: string;
};

type Stick = {
  id: number;
  owner: string;
  left: number;
  delay: number;
  rotation: number;
  size: number;
};

const characters: Character[] = [
  {
    id: "keroro",
    name: "케로로",
    product: "아몬드",
    color: "#45B95E",
    image: "/characters/keroro.png",
    heartStart: "#8BF29C",
    heartEnd: "#168B45",
  },
  {
    id: "tamama",
    name: "타마마",
    product: "초코 쿠키",
    color: "#398CEB",
    image: "/characters/tamama.png",
    heartStart: "#9BDAFF",
    heartEnd: "#2461C9",
  },
  {
    id: "giroro",
    name: "기로로",
    product: "오리지널",
    color: "#E84B4B",
    image: "/characters/giroro.png",
    heartStart: "#FFAAAA",
    heartEnd: "#D51E35",
  },
  {
    id: "kururu",
    name: "쿠루루",
    product: "누드",
    color: "#E9B82F",
    image: "/characters/kururu.png",
    heartStart: "#FFF0A0",
    heartEnd: "#DB9414",
  },
  {
    id: "dororo",
    name: "도로로",
    product: "크림치즈",
    color: "#62C9E9",
    image: "/characters/dororo.png",
    heartStart: "#B8F2FF",
    heartEnd: "#329BC8",
  },
];

function App() {
  const [opened, setOpened] = useState<string[]>([]);
  const [sticks, setSticks] = useState<Stick[]>([]);
  const [celebration, setCelebration] = useState(false);
  const [zoroIntro, setZoroIntro] = useState(false);
  const [ending, setEnding] = useState(false);

  const openBox = (character: Character) => {
    if (opened.includes(character.id) || celebration) {
      return;
    }

    setOpened((prev) => [...prev, character.id]);

    const newSticks: Stick[] = Array.from(
      { length: 24 },
      (_, i) => ({
        id: Date.now() + i + Math.random(),
        owner: character.id,
        left: 15 + Math.random() * 70,
        delay: Math.random() * 0.7,
        rotation: Math.random() * 720 - 360,
        size: 0.8 + Math.random() * 0.5,
      })
    );

    setSticks((prev) => [...prev, ...newSticks]);
  };

  const allOpened = opened.length === 5;

  // 모든 상자를 열면 춤 시작
  useEffect(() => {
    if (!allOpened) return;

    const timer = setTimeout(() => {
      setCelebration(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, [allOpened]);

  // 춤이 끝나면 조로 생일 화면 등장
  useEffect(() => {
    if (!celebration) return;

    const timer = setTimeout(() => {
      setZoroIntro(true);
    }, 5300);

    return () => clearTimeout(timer);
  }, [celebration]);

  // 조로 생일 화면이 끝나면 케로로 엔딩
  useEffect(() => {
    if (!zoroIntro) return;

    const timer = setTimeout(() => {
      setEnding(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [zoroIntro]);

  return (
    <main className="page">

      {/* 배경 장식 */}
      <div className="background-decoration">
        <span>✦</span>
        <span>♡</span>
        <span>✧</span>
        <span>♡</span>
        <span>✦</span>
        <span>✧</span>
      </div>

      {/* 첫 번째 화면 */}
      {!celebration && (
        <>
          <header className="header">
            <p className="sub-title">NOVEMBER 11</p>
            <h1>Happy Pepero Day!</h1>
          </header>

          {/* 캐릭터 5명 */}
          <section className="collection">
            {characters.map((character) => {
              const isOpened = opened.includes(character.id);

              return (
                <div className="character-card" key={character.id}>
                  <div className="character-image">
                    <img
                      src={character.image}
                      alt={character.name}
                    />

                    {/* 빼빼로 패키지 상자 */}
                    <button
                      className={`gift-box ${isOpened ? "box-opened" : ""
                        }`}
                      style={
                        {
                          "--box-color": character.color,
                        } as CSSProperties
                      }
                      onClick={() => openBox(character)}
                      disabled={isOpened || celebration}
                    >
                      {isOpened ? (
                        <span className="check">✓</span>
                      ) : (
                        <div className={`pepero-package pepero-${character.id}`}>
                          <span className="package-brand">
                            PEPERO
                          </span>

                          <span className="package-sticks">
                            <i></i>
                            <i></i>
                            <i></i>
                          </span>

                          <span className="package-flavor">
                            {character.product}
                          </span>
                        </div>
                      )}
                    </button>
                  </div>

                  <p className="product-name">
                    {isOpened
                      ? "선물 전달 완료!"
                      : character.product + " 빼빼로"}
                  </p>
                </div>
              );
            })}
          </section>

          {/* 진행 상황 */}
          <section className="progress">
            <p>
              PEPERO COLLECTION
              <strong>{opened.length} / 5</strong>
            </p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${opened.length * 20}%`,
                }}
              />
            </div>

            <p className="progress-message">
              {allOpened
                ? "모든 선물이 도착했어요!"
                : "다섯 개의 상자를 모두 열어보세요 ♥"}
            </p>
          </section>
        </>
      )}

      {/* 빼빼로 떨어지는 애니메이션 */}
      <div className="falling-container">
        {sticks.map((stick) => (
          <div
            className={`falling-stick falling-${stick.owner}`}
            key={stick.id}
            style={
              {
                left: `${stick.left}%`,
                "--rotation": `${stick.rotation}deg`,
                "--delay": `${stick.delay}s`,
                "--stick-size": stick.size,
              } as CSSProperties
            }
          >
            <div className="stick">
              <span />
            </div>
          </div>
        ))}
      </div>

      {/* 케로로 소대 댄스 */}
      {celebration && !zoroIntro && !ending && (
        <section className="dance-scene">

          <div className="dance-line">
            {characters.map((character, index) => (
              <div
                className={`dancer dancer-${character.id}`}
                key={character.id}
                style={
                  {
                    "--dance-delay": `${index * 0.65}s`,
                    "--heart-delay": `${index * 0.65}s`,
                    "--heart-color": character.heartStart,
                    "--heart-end": character.heartEnd,
                  } as CSSProperties
                }
              >
                <img
                  src={character.image}
                  alt={character.name}
                />

                <div className="heart-launch">♥</div>
                {/* 케로로: 날아다니는 장난스러운 효과 */}
                {character.id === "keroro" && (
                  <div className="special-effect keroro-effect">
                    <span>💩</span>
                    <span>💩</span>
                    <span>💩</span>
                  </div>
                )}

                {/* 타마마: 분노 충격파 */}
                {character.id === "tamama" && (
                  <div className="special-effect tamama-effect">
                    <span>💢</span>
                    <span>💥</span>
                    <span>💢</span>
                  </div>
                )}

                {/* 기로로: 별빛 발사 */}
                {character.id === "giroro" && (
                  <div className="special-effect giroro-effect">
                    <span>🔫</span>
                    <span>🔫</span>
                    <span>🔫</span>
                  </div>
                )}

                {/* 쿠루루: 노란 소용돌이 */}
                {character.id === "kururu" && (
                  <div className="special-effect kururu-effect">
                    <span>🌀</span>
                    <span>🌀</span>
                    <span>🌀</span>
                  </div>
                )}

                {/* 도로로: 파란 닌자 연기 */}
                {character.id === "dororo" && (
                  <div className="special-effect dororo-effect">
                    <span>💨</span>
                    <span>🥷 </span>
                    <span>💨</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      {/* 조로 생일 축하 화면 */}
      {zoroIntro && !ending && (
        <section className="zoro-intro">
          <img
            className="zoro-image"
            src="/characters/zoro.png"
            alt="롤로노아 조로"
          />

          <h1 className="zoro-message">
            11월 11일<br />
            오늘은 롤로노아 조로의<br />
            생일입니다.
          </h1>
        </section>
      )}
      {/* 최종 케로로 엔딩 */}
      {ending && (
        <section className="ending-scene">
          <div className="ending-hearts">
            {Array.from({ length: 16 }, (_, i) => (
              <span
                key={i}
                style={
                  {
                    "--heart-index": i,
                  } as CSSProperties
                }
              >
                ♥
              </span>
            ))}
          </div>

          <div className="keroro-ending">
            <img
              src="/characters/keroro-face.png"
              alt="케로로"
            />
          </div>

          <h1 className="love-message">
            조로 생일축하해!!
          </h1>
        </section>
      )}

    </main>
  );
}

export default App;
