"use client";

import { useState } from "react";
import { Share2, Printer, Copy, MessageCircle, Palette, CircleOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

function getPageUrl() {
  return typeof window !== "undefined" ? window.location.href : "";
}

const SHARE_TITLE = "Denis Letian Sekento | In Loving Memory (1985 – 2026)";
const SHARE_TEXT =
  "In loving memory of Denis Letian Sekento. He fought a good fight, finished the course, and kept the faith.";

export function SharePrintWidget() {
  const [open, setOpen] = useState(false);

  async function handleNativeShare() {
    const url = getPageUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url });
        setOpen(false);
      } catch {
        // User cancelled or share failed — ignore
      }
    } else {
      await handleCopyLink();
    }
  }

  async function handleCopyLink() {
    const url = getPageUrl();
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  }

  function handleWhatsApp() {
    const url = getPageUrl();
    const text = encodeURIComponent(`${SHARE_TEXT}\n${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener");
  }

  function handlePrint(bw: boolean) {
    setOpen(false);
    if (bw) {
      document.documentElement.classList.add("print-bw");
    }
    // Small delay to let the dialog close before triggering print
    setTimeout(() => {
      window.print();
      // Clean up after print dialog closes
      document.documentElement.classList.remove("print-bw");
    }, 300);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gold text-white shadow-lg hover:bg-gold-light print:hidden"
            aria-label="Share or print this page"
          >
            <Share2 className="h-6 w-6" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share & Print</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="share" className="mt-2">
            <TabsList className="w-full">
              <TabsTrigger value="share" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </TabsTrigger>
              <TabsTrigger value="print" className="flex-1">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </TabsTrigger>
            </TabsList>

            <TabsContent value="share" className="mt-4 space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleNativeShare}
              >
                <Share2 className="mr-3 h-4 w-4" />
                Share via your device
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleCopyLink}>
                <Copy className="mr-3 h-4 w-4" />
                Copy link
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleWhatsApp}>
                <MessageCircle className="mr-3 h-4 w-4" />
                Share on WhatsApp
              </Button>
            </TabsContent>

            <TabsContent value="print" className="mt-4 space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handlePrint(false)}
              >
                <Palette className="mr-3 h-4 w-4" />
                Print in Color
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handlePrint(true)}
              >
                <CircleOff className="mr-3 h-4 w-4" />
                Print in Black & White
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
