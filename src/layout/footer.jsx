const Footer = () => {
  return (
    <footer className="w-full py-12 px-12 bg-black/50 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-gray-400 text-sm font-semibold mb-3">Audio and Subtitles</h3>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-semibold mb-3">Media Center</h3>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-semibold mb-3">Privacy</h3>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-semibold mb-3">Contact Us</h3>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} SubhaMOVIES, Inc.
        </p>
      </div>
    </footer>
  );
};
export default Footer;