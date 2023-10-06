export default function LanguageSwitcher() {
    return (
      <div className="dropdown">
      <button>Choose Language</button>
      <div className="dropdown-content">
        <a href="english-translate">English</a>
        <a href="french-translate">French</a>
      </div>
  </div> 
    );
  }