import React from "react";

const Poster = () => {
  return (
    <div style={{display:"flex",justifyContent: "center", gap:"2em"}}>
        <div >
          <img
            alt="proposition"
            src="https://zen.wego.com/web/illustrations/look-no-further.png"
            height="100"
            width="100"
          />
          <div >
            أفضل تطبيقات السفر في الأردن
          </div>
          <div>
            حاصل على تقييم عال في متجر التطبيقات وغوغل بلاي
          </div>
        </div>
        <div>
          <img
            alt="proposition"
            src="https://zen.wego.com/web/illustrations/shop-with-confidence.png"
            height="100"
            width="100"
          />
          <div>
            أسعار نهائيّة
          </div>
          <div>
            لا ضرائب أو رسوم إضافية{" "}
          </div>
        </div>
        <div>
          <img
            alt="proposition"
            src="https://zen.wego.com/web/illustrations/pay-the-way-you-want.png"
            height="100"
            width="100"
          />
          <div>
            خيارات دفع واسعة{" "}
          </div>
          <div >
            نتائج بحث تناسب وسائل الدفع المفضلة لديك
          </div>
        </div>
        <div >
          <img
            alt="proposition"
            src="https://zen.wego.com/web/illustrations/instant-booking.png"
            height="100"
            width="100"
          />
          <div >
            حجز أسرع وأسهل
          </div>
          <div >
            ابحث، قارن ثم احجز بسرعة قصوى مع نخبة المزودين
          </div>
        </div>
     
    </div>
  );
};

export default Poster;
