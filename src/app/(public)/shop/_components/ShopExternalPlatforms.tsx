import FadeIn from '@/components/shared/FadeIn';

export default function ShopExternalPlatforms() {
  return (
    <div className="py-12 border-t border-border/50">
      <FadeIn direction="up" className="flex flex-col items-center justify-center gap-6 text-center">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Also officially available on
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a 
            href="https://etsy.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-6 py-3 border border-border/50 rounded-full hover:border-[#F1641E] hover:text-[#F1641E] transition-colors font-medium text-sm flex items-center gap-2 group bg-card"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current transition-colors" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.559 2.445c0-.325.033-.52.59-.52h7.465c1.3 0 2.02 1.11 2.54 3.193l.42 1.666h1.27c.23-4.728.43-6.784.43-6.784s-3.196.36-5.09.36H6.635L1.521.196v1.37l1.725.326c1.21.24 1.5.496 1.6 1.606 0 0 .11 3.27.11 8.64 0 5.385-.09 8.61-.09 8.61 0 .973-.39 1.333-1.59 1.573l-1.722.33V24l5.13-.165h8.55c1.935 0 6.39.165 6.39.165.105-1.17.75-6.48.855-7.064h-1.2l-1.284 2.91c-1.005 2.28-2.476 2.445-4.11 2.445h-4.906c-1.63 0-2.415-.64-2.415-2.05V12.8s3.62 0 4.79.096c.912.064 1.463.325 1.76 1.598l.39 1.695h1.41l-.09-4.278.192-4.305h-1.391l-.45 1.89c-.283 1.244-.48 1.47-1.754 1.6-1.666.17-4.815.14-4.815.14V2.45h-.05z"/>
            </svg>
            Etsy
          </a>
          <a 
            href="https://shopify.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-6 py-3 border border-border/50 rounded-full hover:border-[#95BF47] hover:text-[#95BF47] transition-colors font-medium text-sm flex items-center gap-2 group bg-card"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current transition-colors" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z"/>
            </svg>
            Shopify
          </a>
          <a 
            href="https://amazon.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-6 py-3 border border-border/50 rounded-full hover:border-[#FF9900] hover:text-[#FF9900] transition-colors font-medium text-sm flex items-center gap-2 group bg-card"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current transition-colors" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.49 10.364c0-2.83-2.174-3.535-4.48-3.535-2.507 0-4.57 1.101-5.111 1.488l.849 2.05c.465-.333 1.838-1.07 3.535-1.07 1.253 0 1.94.464 1.94 1.292 0 .586-.384 1.05-1.435 1.151-2.929.283-5.353 1.05-5.353 3.636 0 1.96 1.474 3.03 3.393 3.03 1.859 0 2.95-.788 3.515-1.495.101.99.889 1.495 1.838 1.495 1.03 0 1.94-.404 2.505-.889l-.666-1.98c-.283.182-.828.485-1.394.485-.687 0-1.131-.323-1.131-1.394V10.364zM11.52 16.08c-.707 0-1.575-.383-1.575-1.373 0-1.11 1.151-1.333 2.747-1.495v1.232c0 .99-.687 1.636-1.172 1.636zm9.293-1.03a11.834 11.834 0 0 1-5.717 2.626 13.916 13.916 0 0 1-4.888 0 11.97 11.97 0 0 1-5.757-2.606.327.327 0 0 0-.465.04l-1.333 1.475a.31.31 0 0 0 .04.424A14.288 14.288 0 0 0 9.53 20.31a16.897 16.897 0 0 0 5.616 0c2.505-.444 4.889-1.515 6.949-3.212a.326.326 0 0 0 .04-.444l-1.313-1.535a.314.314 0 0 0-.01-.069z"/>
            </svg>
            Amazon
          </a>
          <a 
            href="https://gumroad.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-6 py-3 border border-border/50 rounded-full hover:border-[#FF90E8] hover:text-[#FF90E8] transition-colors font-medium text-sm flex items-center gap-2 group text-foreground bg-card"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current transition-colors" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0Zm-.007 5.12c4.48 0 5.995 3.025 6.064 4.744h-3.239c-.069-.962-.897-2.406-2.896-2.406-2.136 0-3.514 1.857-3.514 4.126 0 2.27 1.378 4.125 3.514 4.125 1.93 0 2.758-1.512 3.103-3.025h-3.103v-1.238h6.509v6.327h-2.855v-3.989c-.207 1.444-1.102 4.264-4.617 4.264-3.516 0-5.584-2.82-5.584-6.326 0-3.645 2.276-6.602 6.618-6.602z"/>
            </svg>
            Gumroad
          </a>
        </div>
      </FadeIn>
    </div>
  );
}
