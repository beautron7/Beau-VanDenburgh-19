using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour {

	public float accel;
    public float maxLateralForce;
    public float maxjumpforce;
    public float jumptimefactor;

    public float airtime;
	public Rigidbody rb;
    public int lookdirection = 1;
    public bool jumping;
    public int grounds;
    public bool isGrounded = false;
    public float forceV;
    public float forceH;

    void Start ()
	{
		rb = GetComponent<Rigidbody>();

	}

    void OnCollisionEnter(Collision col)
    {
        grounds++;
    }

    void OnCollisionExit(Collision col)
    {
        grounds--;
    }

    void FixedUpdate ()
	{
        float jumpvol=0.0f;
        float moveVertical=0.0f;
        float moveHorizontal=0.0f;
        if (lookdirection == 1) {
            moveHorizontal = forceH;
            moveVertical = forceV;
        } else if (lookdirection == 2) {
            moveHorizontal = forceV;
            moveVertical = -forceH;
        } else if (lookdirection == 3) {
            moveHorizontal = -forceH;
            moveVertical = -forceV;
        } else if (lookdirection == 4) {
            moveHorizontal = -forceV;
            moveVertical = forceH;
        }
        if (jumping)
        {
            if (airtime < 3)
            {
                //rb.AddForce(0.0f, 0.3f, 0.0f);
                rb.useGravity = false;
                rb.transform.position = new Vector3(rb.transform.position.x, rb.transform.position.y + 0.1f, rb.transform.position.z);
            } else
            {
                rb.useGravity = true;
                jumpvol = (Mathf.Abs(maxjumpforce - ((airtime / jumptimefactor) * (airtime / jumptimefactor))) + (maxjumpforce - ((airtime / jumptimefactor) * (airtime / jumptimefactor)))) / 2;
            }
        }
        Vector3 movement = new Vector3 (moveHorizontal, jumpvol, moveVertical);
		rb.AddForce (movement);
	}

    void Update()
    {
        if (grounds > 0)
        {
            isGrounded = true;
            airtime = 0;
        } else
        {
            isGrounded = false;
        }
        if (Input.GetKeyDown("e"))
        {
            lookdirection++;
            if (lookdirection == 5)
            {
                lookdirection = 1;
            }
        }
        if (Input.GetKey("space")&&((isGrounded)||((!isGrounded)&&(airtime>0))))
        {
            jumping = true;
            airtime+=Time.deltaTime*16;
        } else
        {
            jumping = false;
            airtime = 0;
        }
        if (!Input.GetKey("space"))
        {
            rb.useGravity = true;
        }
        if (Input.GetKeyDown("1"))
        {
            lookdirection = 1;
        }
        else if (Input.GetKeyDown("2"))
        {
            lookdirection = 2;
        }
        else if (Input.GetKeyDown("3"))
        {
            lookdirection = 3;
        }
        else if (Input.GetKeyDown("4"))
        {
            lookdirection = 4;
        }
        if (Input.GetKey("q"))
        {
            rb.velocity = new Vector3(0, 0, 0);
            Input.ResetInputAxes();
            rb.velocity = new Vector3(0, 0, 0);
        }

        if (Input.GetKey("w"))
        {
            forceV += accel;
            if (forceV > maxLateralForce)
            {
                forceV = maxLateralForce;
            }
        } else if(Input.GetKey("s")){
            forceV -= accel;
            if (forceV < -maxLateralForce)
            {
                forceV = -maxLateralForce;
            }
        } else {
            forceV /= 2;
        }
        if (Input.GetKey("a"))
        {
            forceH -= accel;
            if (forceH < -maxLateralForce)
            {
                forceH = -maxLateralForce;
            }
        }else if (Input.GetKey("d"))
        {
            forceH += accel;
            if (forceH > maxLateralForce)
            {
                forceH = maxLateralForce;
            }
        } else
        {
            forceH /= 2;
        }
    }
}
