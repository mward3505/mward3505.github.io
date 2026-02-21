import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Contact"];

const SKILLS = [
    {
        category: "Frontend",
        items: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vite"],
    },
    {
        category: "Backend",
        items: ["Python", "FastAPI", "SQLAlchemy", "Pydantic", "REST APIs"],
    },
    {
        category: "Database & Auth",
        items: ["SQLite", "PostgreSQL", "JWT", "SQLAlchemy ORM"],
    },
    {
        category: "Tools & Deployment",
        items: ["Git", "GitHub", "AWS", "Docker", "Netlify", "Railway"],
    },
];

const EXPERIENCE = [
    {
        role: "Full-Stack Developer",
        company: "Reaction Data",
        period: "Aug 2024 – Present",
        bullets: [
            "Lead React web feature development improving session duration and click-through rates",
            "Optimized SQL queries and API performance reducing response times by 20%",
            "Built Python API automating client survey delivery, reducing analyst workload by 75%",
            "Support AWS deployment pipelines and DevOps practices for production systems",
        ],
    },
    {
        role: "Business Analyst II",
        company: "doTERRA",
        period: "Oct 2019 – Jan 2024",
        bullets: [
            "Partnered with 10 engineers to deliver doTERRA's first mobile application",
            "Managed Agile sprint backlogs increasing team productivity by 80%",
            "Supported back-end debugging and testing for database compatibility",
        ],
    },
];

const PROJECTS = [
    {
        name: "TimeForge",
        tagline: "Turn available time into realistic plans",
        description:
            "A full-stack scheduling app that forces you to confront your real time budget. Set weekly availability, create prioritized activities, and generate a schedule that actually fits your day.",
        tech: [
            "React",
            "TypeScript",
            "FastAPI",
            "SQLAlchemy",
            "JWT Auth",
            "Tailwind CSS",
        ],
        live: "https://timeforge-mvp.netlify.app/",
        repo: "https://github.com/mward3505/timeforge",
        highlight: true,
    },
];

function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setInView(true);
            },
            { threshold },
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        document
            .getElementById(id.toLowerCase())
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: "0 2rem",
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: scrolled ? "rgba(8, 8, 12, 0.92)" : "transparent",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                borderBottom: scrolled
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "none",
                transition: "all 0.4s ease",
            }}
        >
            <span
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    letterSpacing: "0.05em",
                    color: "#fff",
                    cursor: "pointer",
                }}
            >
                MW<span style={{ color: "#00e5ff" }}>.</span>
            </span>

            <div style={{ display: "flex", gap: "2rem" }}>
                {NAV_LINKS.map((link) => (
                    <button
                        key={link}
                        onClick={() => scrollTo(link)}
                        style={{
                            background: "none",
                            border: "none",
                            color: "rgba(255,255,255,0.6)",
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.8rem",
                            letterSpacing: "0.08em",
                            cursor: "pointer",
                            transition: "color 0.2s",
                            padding: "0.25rem 0",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#00e5ff")}
                        onMouseLeave={(e) =>
                            (e.target.style.color = "rgba(255,255,255,0.6)")
                        }
                    >
                        {link.toUpperCase()}
                    </button>
                ))}
            </div>
        </nav>
    );
}

function Hero() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setTimeout(() => setMounted(true), 100);
    }, []);

    return (
        <section
            id="about"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                padding: "0 2rem",
            }}
        >
            {/* Grid background */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
          linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)
        `,
                    backgroundSize: "60px 60px",
                    maskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
                }}
            />

            {/* Glow orb */}
            <div
                style={{
                    position: "absolute",
                    width: "600px",
                    height: "600px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    position: "relative",
                    paddingTop: "80px",
                }}
            >
                <div
                    style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.8rem",
                        color: "#00e5ff",
                        letterSpacing: "0.15em",
                        marginBottom: "1.5rem",
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "none" : "translateY(12px)",
                        transition: "all 0.6s ease 0.2s",
                    }}
                >
                    &gt; HELLO, WORLD
                </div>

                <h1
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(3rem, 8vw, 6rem)",
                        lineHeight: 1.0,
                        margin: "0 0 1.5rem",
                        color: "#fff",
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "none" : "translateY(20px)",
                        transition: "all 0.7s ease 0.35s",
                    }}
                >
                    Matthew
                    <br />
                    <span
                        style={{
                            color: "transparent",
                            WebkitTextStroke: "2px rgba(255,255,255,0.3)",
                        }}
                    >
                        Ward
                    </span>
                </h1>

                <p
                    style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "clamp(1rem, 2vw, 1.25rem)",
                        color: "rgba(255,255,255,0.55)",
                        maxWidth: "600px",
                        lineHeight: 1.7,
                        marginBottom: "2.5rem",
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "none" : "translateY(20px)",
                        transition: "all 0.7s ease 0.5s",
                    }}
                >
                    Full-stack developer building real products with{" "}
                    <span style={{ color: "#00e5ff" }}>React</span> and{" "}
                    <span style={{ color: "#00e5ff" }}>Python</span>. Bilingual
                    (English/Spanish) and currently building in production at{" "}
                    <span style={{ color: "#00e5ff" }}>Reaction Data</span>.
                </p>

                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        flexWrap: "wrap",
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "none" : "translateY(20px)",
                        transition: "all 0.7s ease 0.65s",
                    }}
                >
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document
                                .getElementById("projects")
                                ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        style={{
                            padding: "0.85rem 2rem",
                            background: "#00e5ff",
                            color: "#08080c",
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textDecoration: "none",
                            borderRadius: "2px",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = "#33eaff";
                            e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = "#00e5ff";
                            e.target.style.transform = "none";
                        }}
                    >
                        VIEW WORK
                    </a>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            padding: "0.85rem 2rem",
                            background: "transparent",
                            color: "rgba(255,255,255,0.7)",
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textDecoration: "none",
                            borderRadius: "2px",
                            border: "1px solid rgba(255,255,255,0.15)",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = "rgba(0,229,255,0.4)";
                            e.target.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor =
                                "rgba(255,255,255,0.15)";
                            e.target.style.color = "rgba(255,255,255,0.7)";
                        }}
                    >
                        RESUME ↗
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                style={{
                    position: "absolute",
                    bottom: "2rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                    opacity: mounted ? 0.4 : 0,
                    transition: "opacity 1s ease 1.5s",
                }}
            >
                <div
                    style={{
                        width: "1px",
                        height: "48px",
                        background:
                            "linear-gradient(to bottom, transparent, rgba(0,229,255,0.6))",
                        animation: "pulse 2s ease-in-out infinite",
                    }}
                />
            </div>
        </section>
    );
}

function Skills() {
    return (
        <section
            id="skills"
            style={{ padding: "8rem 2rem", position: "relative" }}
        >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                <FadeIn>
                    <div
                        style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.75rem",
                            color: "#00e5ff",
                            letterSpacing: "0.15em",
                            marginBottom: "1rem",
                        }}
                    >
                        02 / SKILLS
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            color: "#fff",
                            marginBottom: "3.5rem",
                            lineHeight: 1.1,
                        }}
                    >
                        Tech Stack
                    </h2>
                </FadeIn>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {SKILLS.map((group, i) => (
                        <FadeIn key={group.category} delay={i * 0.1}>
                            <div
                                style={{
                                    padding: "1.75rem",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    borderRadius: "4px",
                                    transition: "border-color 0.3s",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.borderColor =
                                        "rgba(0,229,255,0.25)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.borderColor =
                                        "rgba(255,255,255,0.07)")
                                }
                            >
                                <div
                                    style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: "0.7rem",
                                        color: "#00e5ff",
                                        letterSpacing: "0.12em",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {group.category.toUpperCase()}
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.6rem",
                                    }}
                                >
                                    {group.items.map((item) => (
                                        <div
                                            key={item}
                                            style={{
                                                fontFamily:
                                                    "'DM Sans', sans-serif",
                                                fontSize: "0.95rem",
                                                color: "rgba(255,255,255,0.7)",
                                            }}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Experience() {
    return (
        <section
            id="experience"
            style={{ padding: "8rem 2rem", position: "relative" }}
        >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                <FadeIn>
                    <div
                        style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.75rem",
                            color: "#00e5ff",
                            letterSpacing: "0.15em",
                            marginBottom: "1rem",
                        }}
                    >
                        03 / EXPERIENCE
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            color: "#fff",
                            marginBottom: "3.5rem",
                            lineHeight: 1.1,
                        }}
                    >
                        Where I've Worked
                    </h2>
                </FadeIn>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                    }}
                >
                    {EXPERIENCE.map((job, i) => (
                        <FadeIn key={job.company} delay={i * 0.1}>
                            <div
                                style={{
                                    padding: "2rem",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    borderRadius: "4px",
                                    transition: "border-color 0.3s",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.borderColor =
                                        "rgba(0,229,255,0.25)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.borderColor =
                                        "rgba(255,255,255,0.07)")
                                }
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        flexWrap: "wrap",
                                        gap: "0.5rem",
                                        marginBottom: "1.25rem",
                                    }}
                                >
                                    <div>
                                        <h3
                                            style={{
                                                fontFamily:
                                                    "'Syne', sans-serif",
                                                fontWeight: 800,
                                                fontSize: "1.25rem",
                                                color: "#fff",
                                                marginBottom: "0.25rem",
                                            }}
                                        >
                                            {job.role}
                                        </h3>
                                        <div
                                            style={{
                                                fontFamily:
                                                    "'DM Mono', monospace",
                                                fontSize: "0.75rem",
                                                color: "#00e5ff",
                                                letterSpacing: "0.1em",
                                            }}
                                        >
                                            {job.company}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: "0.7rem",
                                            color: "rgba(255,255,255,0.35)",
                                            letterSpacing: "0.08em",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {job.period}
                                    </div>
                                </div>

                                <ul
                                    style={{
                                        listStyle: "none",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.6rem",
                                    }}
                                >
                                    {job.bullets.map((bullet, j) => (
                                        <li
                                            key={j}
                                            style={{
                                                display: "flex",
                                                gap: "0.75rem",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: "#00e5ff",
                                                    marginTop: "0.35rem",
                                                    flexShrink: 0,
                                                    fontSize: "0.6rem",
                                                }}
                                            >
                                                ▸
                                            </span>
                                            <span
                                                style={{
                                                    fontFamily:
                                                        "'DM Sans', sans-serif",
                                                    fontSize: "0.95rem",
                                                    color: "rgba(255,255,255,0.65)",
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {bullet}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Projects() {
    return (
        <section
            id="projects"
            style={{ padding: "8rem 2rem", position: "relative" }}
        >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                <FadeIn>
                    <div
                        style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.75rem",
                            color: "#00e5ff",
                            letterSpacing: "0.15em",
                            marginBottom: "1rem",
                        }}
                    >
                        04 / PROJECTS
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            color: "#fff",
                            marginBottom: "3.5rem",
                            lineHeight: 1.1,
                        }}
                    >
                        What I've Built
                    </h2>
                </FadeIn>

                {PROJECTS.map((project, i) => (
                    <FadeIn key={project.name} delay={i * 0.1}>
                        <div
                            style={{
                                padding: "2.5rem",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(0,229,255,0.2)",
                                borderRadius: "4px",
                                marginBottom: "1.5rem",
                                position: "relative",
                                overflow: "hidden",
                                transition: "transform 0.3s, border-color 0.3s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-4px)";
                                e.currentTarget.style.borderColor =
                                    "rgba(0,229,255,0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "none";
                                e.currentTarget.style.borderColor =
                                    "rgba(0,229,255,0.2)";
                            }}
                        >
                            {/* Corner accent */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    width: "80px",
                                    height: "80px",
                                    background:
                                        "linear-gradient(225deg, rgba(0,229,255,0.08) 0%, transparent 60%)",
                                }}
                            />

                            <div
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: "0.7rem",
                                    color: "#00e5ff",
                                    letterSpacing: "0.12em",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                FEATURED PROJECT
                            </div>

                            <h3
                                style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontWeight: 800,
                                    fontSize: "1.75rem",
                                    color: "#fff",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                {project.name}
                            </h3>

                            <p
                                style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "0.9rem",
                                    color: "#00e5ff",
                                    marginBottom: "1.25rem",
                                    fontStyle: "italic",
                                }}
                            >
                                {project.tagline}
                            </p>

                            <p
                                style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "1rem",
                                    color: "rgba(255,255,255,0.6)",
                                    lineHeight: 1.7,
                                    marginBottom: "1.75rem",
                                    maxWidth: "600px",
                                }}
                            >
                                {project.description}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "0.5rem",
                                    marginBottom: "2rem",
                                }}
                            >
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        style={{
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: "0.7rem",
                                            color: "rgba(255,255,255,0.5)",
                                            padding: "0.3rem 0.75rem",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "2px",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div style={{ display: "flex", gap: "1rem" }}>
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: "0.8rem",
                                        color: "#00e5ff",
                                        textDecoration: "none",
                                        letterSpacing: "0.08em",
                                        transition: "opacity 0.2s",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.target.style.opacity = "0.7")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.target.style.opacity = "1")
                                    }
                                >
                                    LIVE DEMO ↗
                                </a>
                                <a
                                    href={project.repo}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: "0.8rem",
                                        color: "rgba(255,255,255,0.4)",
                                        textDecoration: "none",
                                        letterSpacing: "0.08em",
                                        transition: "color 0.2s",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.target.style.color =
                                            "rgba(255,255,255,0.8)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.target.style.color =
                                            "rgba(255,255,255,0.4)")
                                    }
                                >
                                    GITHUB →
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                ))}

                <FadeIn delay={0.2}>
                    <div
                        style={{
                            marginTop: "2rem",
                            padding: "1.5rem 2rem",
                            border: "1px dashed rgba(255,255,255,0.1)",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "1rem",
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                color: "rgba(255,255,255,0.35)",
                                fontSize: "0.9rem",
                            }}
                        >
                            More projects coming soon —
                        </span>
                        <a
                            href="https://github.com/mward3505"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: "0.75rem",
                                color: "rgba(255,255,255,0.4)",
                                textDecoration: "none",
                                letterSpacing: "0.08em",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.color = "#00e5ff")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.color = "rgba(255,255,255,0.4)")
                            }
                        >
                            SEE ALL ON GITHUB ↗
                        </a>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

function Contact() {
    return (
        <section
            id="contact"
            style={{ padding: "8rem 2rem 6rem", position: "relative" }}
        >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                <FadeIn>
                    <div
                        style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.75rem",
                            color: "#00e5ff",
                            letterSpacing: "0.15em",
                            marginBottom: "1rem",
                        }}
                    >
                        05 / CONTACT
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(2rem, 4vw, 3.5rem)",
                            color: "#fff",
                            marginBottom: "1rem",
                            lineHeight: 1.1,
                        }}
                    >
                        Let's Work Together
                    </h2>
                    <p
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "1.1rem",
                            color: "rgba(255,255,255,0.5)",
                            marginBottom: "3rem",
                            maxWidth: "480px",
                            lineHeight: 1.7,
                        }}
                    >
                        I'm actively looking for full-time opportunities. If you
                        think I'd be a good fit for your team, I'd love to hear
                        from you.
                    </p>
                </FadeIn>

                <FadeIn delay={0.15}>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}
                    >
                        {[
                            {
                                label: "EMAIL",
                                href: "mailto:matt.ward3505@gmail.com",
                                icon: "→",
                            },
                            {
                                label: "GITHUB",
                                href: "https://github.com/mward3505",
                                icon: "↗",
                            },
                            {
                                label: "LINKEDIN",
                                href: "https://www.linkedin.com/in/matthew-ward-a5507624a/",
                                icon: "↗",
                            },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.85rem 1.75rem",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "2px",
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: "0.8rem",
                                    color: "rgba(255,255,255,0.6)",
                                    textDecoration: "none",
                                    letterSpacing: "0.08em",
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor =
                                        "rgba(0,229,255,0.35)";
                                    e.currentTarget.style.color = "#00e5ff";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor =
                                        "rgba(255,255,255,0.1)";
                                    e.currentTarget.style.color =
                                        "rgba(255,255,255,0.6)";
                                }}
                            >
                                {link.label} <span>{link.icon}</span>
                            </a>
                        ))}
                    </div>
                </FadeIn>
            </div>

            <div
                style={{
                    marginTop: "8rem",
                    paddingTop: "2rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                    maxWidth: "900px",
                    margin: "8rem auto 0",
                }}
            >
                <span
                    style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.7rem",
                        color: "rgba(255,255,255,0.2)",
                        letterSpacing: "0.08em",
                    }}
                >
                    © 2026 MATTHEW WARD
                </span>
                <span
                    style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.7rem",
                        color: "rgba(255,255,255,0.2)",
                        letterSpacing: "0.08em",
                    }}
                >
                    BUILT WITH REACT
                </span>
            </div>
        </section>
    );
}

export default function Portfolio() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #08080c; }
        ::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.3); border-radius: 2px; }
        button { cursor: pointer; }
      `}</style>
            <div
                style={{
                    background: "#08080c",
                    minHeight: "100vh",
                    color: "#fff",
                }}
            >
                <Navbar />
                <Hero />
                <Skills />
                <Experience />
                <Projects />
                <Contact />
            </div>
        </>
    );
}
