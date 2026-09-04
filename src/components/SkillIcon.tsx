import { FaCode, FaPuzzlePiece } from 'react-icons/fa'
import { MdDesignServices } from 'react-icons/md'
import { SiSharp, SiCss, SiGit, SiGithub, SiGithubcopilot, SiGodotengine, SiHtml5, SiJavascript, SiPython, SiReact, SiUnity } from 'react-icons/si'

export function SkillIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    'Web Development': <FaCode />,
    'UI/UX': <MdDesignServices />,
    Python: <SiPython />,
    JavaScript: <SiJavascript />,
    React: <SiReact />,
    'HTML/CSS': <span className="split-icons"><SiHtml5 /><SiCss /></span>,
    'Git/GitHub': <span className="split-icons"><SiGit /><SiGithub /></span>,
    'AI Tools': <SiGithubcopilot />,
    'Problem Solving': <FaPuzzlePiece />,
    'C#': <SiSharp />,
    Unity: <SiUnity />,
    Godot: <SiGodotengine />,
  }
  return <>{icons[name]}</>
}
