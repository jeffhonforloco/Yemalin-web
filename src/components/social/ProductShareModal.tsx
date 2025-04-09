
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Product } from "../products/ProductCard";
import SocialShareButtons from "./SocialShareButtons";
import { Button } from "../ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductShareModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductShareModal = ({ product, isOpen, onClose }: ProductShareModalProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}/shop/${product.slug}`;
  const shareTitle = `${product.brand} - ${product.name}`;
  const shareDescription = `Check out this amazing product from ${product.brand}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Product link has been copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this product</DialogTitle>
          <DialogDescription>
            Share this {product.name} with your friends and followers
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <h3 className="font-medium mb-3">Share on social media</h3>
          <SocialShareButtons 
            contentType="product"
            contentId={product.id}
            url={shareUrl}
            title={shareTitle}
            description={shareDescription}
            imageUrl={product.imageUrl}
            showLabels
            className="flex-col sm:flex-row flex-wrap"
            size="lg"
            variant="default"
          />
          
          <div className="mt-6">
            <h3 className="font-medium mb-3">Or copy link</h3>
            <div className="flex mt-2 items-center">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 p-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50"
              />
              <Button 
                className="rounded-l-none"
                onClick={handleCopyLink}
                variant={copied ? "outline" : "default"}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" /> Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductShareModal;
