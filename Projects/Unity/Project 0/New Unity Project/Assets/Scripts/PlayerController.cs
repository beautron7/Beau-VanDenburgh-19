using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour {

	public float speed;
    public float maxjumpforce;
    public float jumptimefactor;

    private float airtime;
	private Rigidbody rb;
    private int lookdirection = 1;
    private bool jumping;

    void Start ()
	{
		rb = GetComponent<Rigidbody>();
	}

	void FixedUpdate ()
	{
        float moveHorizontal;
        float moveVertical;

        if (lookdirection == 1) {
            moveHorizontal = Input.GetAxis("Horizontal");
            moveVertical = Input.GetAxis("Vertical");
        } else if (lookdirection == 2) {
            moveHorizontal = Input.GetAxis("Vertical");
            moveVertical = -Input.GetAxis("Horizontal");
        } else if (lookdirection == 3) {
            moveHorizontal = -Input.GetAxis("Horizontal");
            moveVertical = -Input.GetAxis("Vertical");
        } else /*if (lookdirection == 4)*/ {
            moveHorizontal = -Input.GetAxis("Vertical");
            moveVertical = Input.GetAxis("Horizontal");
        }
        if (jumping)
        {
            rb.AddForce(new Vector3(0.0f, (Mathf.Abs(maxjumpforce - ((airtime / jumptimefactor) * (airtime / jumptimefactor))) + (maxjumpforce - ((airtime / jumptimefactor) * (airtime / jumptimefactor)))) / 2, 0.0f));
        }
        Vector3 movement = new Vector3 (moveHorizontal, 0.0f, moveVertical);
		rb.AddForce (movement * speed);

	}

    void Update()
    {
        if (Input.GetKey("space"))
        {
            jumping = true;
            airtime++;
        } else
        {
            jumping = false;
            airtime = 0;
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
    }
}
